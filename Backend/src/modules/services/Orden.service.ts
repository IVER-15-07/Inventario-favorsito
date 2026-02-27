import { EstadoPedido } from "@prisma/client";
import ordenRepository from "../repositories/Orden.repository";
import productoRepository from "../repositories/Productos.repository";
import { ErrorAplicacion } from "../../shared/errors/AppError";

type ItemPedidoInput = {
    productoId: number;
    cantidad: number;
};

class OrdenService {
    private readonly transicionesPermitidas: Record<EstadoPedido, EstadoPedido[]> = {
        [EstadoPedido.PENDIENTE]: [EstadoPedido.PROCESANDO, EstadoPedido.CANCELADO],
        [EstadoPedido.PROCESANDO]: [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO],
        [EstadoPedido.ENVIADO]: [EstadoPedido.ENTREGADO],
        [EstadoPedido.ENTREGADO]: [],
        [EstadoPedido.CANCELADO]: [],
    };

    async crearPedido(data: {
        nombreCliente: string;
        direccion: string;
        items: ItemPedidoInput[];
    }) {
        if (!data.nombreCliente?.trim()) {
            throw ErrorAplicacion.solicitudIncorrecta("El nombre del cliente es obligatorio");
        }

        if (!data.direccion?.trim()) {
            throw ErrorAplicacion.solicitudIncorrecta("La dirección es obligatoria");
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw ErrorAplicacion.solicitudIncorrecta("Debe enviar al menos un producto en la orden");
        }

        const itemsAgrupados = new Map<number, number>();
        for (const item of data.items) {
            if (!Number.isInteger(item.productoId) || item.productoId <= 0) {
                throw ErrorAplicacion.solicitudIncorrecta("productoId inválido en los items");
            }

            if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
                throw ErrorAplicacion.solicitudIncorrecta(
                    `Cantidad inválida para producto ${item.productoId}`
                );
            }

            const acumulado = itemsAgrupados.get(item.productoId) ?? 0;
            itemsAgrupados.set(item.productoId, acumulado + item.cantidad);
        }

        const itemsProcesados: Array<{
            productoId: number;
            cantidad: number;
            precio: number;
        }> = [];

        for (const [productoId, cantidadTotal] of itemsAgrupados.entries()) {
            const producto = await productoRepository.obtenerPorId(productoId);

            if (!producto) {
                throw ErrorAplicacion.noEncontrado(`Producto ${productoId} no existe`);
            }

            if (producto.stock < cantidadTotal) {
                throw ErrorAplicacion.conflicto(
                    `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}, solicitado: ${cantidadTotal}`
                );
            }

            itemsProcesados.push({
                productoId,
                cantidad: cantidadTotal,
                precio: producto.precio,
            });
        }

        try {
            return await ordenRepository.crearPedidoConInventario({
                nombreCliente: data.nombreCliente.trim(),
                direccion: data.direccion.trim(),
                items: itemsProcesados,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw ErrorAplicacion.conflicto(error.message);
            }
            throw error;
        }
    }

    async listarPedidos() {
        return await ordenRepository.listarPedidos();
    }

    async obtenerPedidoPorId(id: number) {
        if (!Number.isInteger(id) || id <= 0) {
            throw ErrorAplicacion.solicitudIncorrecta("ID de pedido inválido");
        }

        const pedido = await ordenRepository.obtenerPedidoPorId(id);

        if (!pedido) {
            throw ErrorAplicacion.noEncontrado(`Pedido con ID ${id} no encontrado`);
        }

        return pedido;
    }

    async actualizarEstado(id: number, nuevoEstado: EstadoPedido) {
        if (!Number.isInteger(id) || id <= 0) {
            throw ErrorAplicacion.solicitudIncorrecta("ID de pedido inválido");
        }

        const pedido = await ordenRepository.obtenerPedidoPorId(id);
        if (!pedido) {
            throw ErrorAplicacion.noEncontrado(`Pedido con ID ${id} no encontrado`);
        }

        const permitidos = this.transicionesPermitidas[pedido.estado];
        if (!permitidos.includes(nuevoEstado)) {
            throw ErrorAplicacion.solicitudIncorrecta(
                `Transición inválida: ${pedido.estado} -> ${nuevoEstado}`
            );
        }

        return await ordenRepository.actualizarEstado(id, nuevoEstado);
    }
}

export default new OrdenService();