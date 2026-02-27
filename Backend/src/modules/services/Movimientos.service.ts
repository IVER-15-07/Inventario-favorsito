import { TipoMovimiento } from "@prisma/client";
import { ErrorAplicacion } from "../../shared/errors/AppError";
import movimientoRepository from "../repositories/Movimientos.repository";

class MovimientoService {
    async listarMovimientos() {
        return await movimientoRepository.listarMovimientos();
    }

    async registrarMovimiento(data: {
        productoId: number;
        cantidad: number;
        tipo: TipoMovimiento;
        motivo: string;
        pedidoId?: number;
    }) {
        if (!Number.isInteger(data.productoId) || data.productoId <= 0) {
            throw ErrorAplicacion.solicitudIncorrecta("productoId inválido");
        }

        if (!Number.isInteger(data.cantidad) || data.cantidad <= 0) {
            throw ErrorAplicacion.solicitudIncorrecta("La cantidad debe ser un entero mayor a 0");
        }

        if (!Object.values(TipoMovimiento).includes(data.tipo)) {
            throw ErrorAplicacion.solicitudIncorrecta("Tipo de movimiento inválido");
        }

        if (!data.motivo?.trim()) {
            throw ErrorAplicacion.solicitudIncorrecta("El motivo es obligatorio");
        }

        if (data.pedidoId !== undefined && (!Number.isInteger(data.pedidoId) || data.pedidoId <= 0)) {
            throw ErrorAplicacion.solicitudIncorrecta("pedidoId inválido");
        }

        try {
            return await movimientoRepository.registrarMovimiento({
                productoId: data.productoId,
                cantidad: data.cantidad,
                tipo: data.tipo,
                motivo: data.motivo.trim(),

                ...(data.pedidoId !== undefined && { pedidoId: data.pedidoId }),
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes("Stock insuficiente")) {
                throw ErrorAplicacion.conflicto(error.message);
            }

            if (error instanceof Error && error.message.includes("Producto no encontrado")) {
                throw ErrorAplicacion.noEncontrado(error.message);
            }

            throw error;
        }
    }
}

export default new MovimientoService();