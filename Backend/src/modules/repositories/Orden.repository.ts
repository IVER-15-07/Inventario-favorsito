import prisma from "../../config/prisma";
import { EstadoPedido, TipoMovimiento } from "@prisma/client";

export class OrdenRepository {

    async crearPedidoConInventario(data: {
        nombreCliente: string;
        direccion: string;
        items: Array<{
            productoId: number;
            cantidad: number;
            precio: number;
        }>;
    }) {
       
        return await prisma.$transaction(async (tx) => {

            for (const item of data.items) {
                const actualizado = await tx.producto.updateMany({
                    where: {
                        id: item.productoId,
                        stock: { gte: item.cantidad }, 
                    },
                    data: {
                        stock: { decrement: item.cantidad }, 
                    },
                });

                if (actualizado.count === 0) {
                    throw new Error(`Stock insuficiente o producto inválido para ID ${item.productoId}`);
                }
            }

            // 2. Crear el registro del Pedido junto con sus detalles
            const pedido = await tx.pedido.create({
                data: {
                    nombreCliente: data.nombreCliente,
                    direccion: data.direccion,
                    estado: EstadoPedido.PENDIENTE,
                    detalles: {
                        create: data.items.map((item) => ({
                            productoId: item.productoId,
                            cantidad: item.cantidad,
                            precio: item.precio,
                        })),
                    },
                },
                include: {
                    detalles: true,
                },
            });

            await tx.moviminetoInventario.createMany({
                data: data.items.map((item) => ({
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    tipo: TipoMovimiento.SALIDA, 
                    motivo: `Salida por creación de pedido #${pedido.id}`,
                    pedidoId: pedido.id, 
                })),
            });

            return pedido;
        });
    }

    async obtenerPedidoPorId(id: number) {
        return await prisma.pedido.findUnique({
            where: { id },
            include: {
                detalles: {
                    include: {
                        producto: true,
                    },
                },
            },
        });
    }

    async listarPedidos() {
        return await prisma.pedido.findMany({
            include: {
                detalles: true,
            },
            orderBy: {
                creadoen: "desc",
            },
        });
    }

    async actualizarEstado(id: number, estado: EstadoPedido) {
        return await prisma.pedido.update({
            where: { id },
            data: { estado },
            include: {
                detalles: true,
            },
        });
    }
}

export default new OrdenRepository();
