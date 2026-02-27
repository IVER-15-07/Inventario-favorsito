import prisma from "../../config/prisma";
import { Prisma, TipoMovimiento } from "@prisma/client";

class MovimientoRepository {
  async listarMovimientos() {
    return await prisma.moviminetoInventario.findMany({
      include: {
        producto: true,
        pedido: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });
  }

  async registrarMovimiento(data: {
    productoId: number;
    cantidad: number;
    tipo: TipoMovimiento;
    motivo: string;
    pedidoId?: number;
  }) {
    return await prisma.$transaction(async (tx) => {
      const producto = await tx.producto.findUnique({
        where: { id: data.productoId },
      });

      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      if (data.tipo === TipoMovimiento.ENTRADA) {
        await tx.producto.update({
          where: { id: data.productoId },
          data: {
            stock: {
              increment: data.cantidad,
            },
          },
        });
      } else {
        const actualizado = await tx.producto.updateMany({
          where: {
            id: data.productoId,
            stock: {
              gte: data.cantidad,
            },
          },
          data: {
            stock: {
              decrement: data.cantidad,
            },
          },
        });

        if (actualizado.count === 0) {
          throw new Error("Stock insuficiente para realizar la salida");
        }
      }

      return await tx.moviminetoInventario.create({
        data: {
          productoId: data.productoId,
          cantidad: data.cantidad,
          tipo: data.tipo,
          motivo: data.motivo,
          pedidoId: data.pedidoId,
        },
        include: {
          producto: true,
          pedido: true,
        },
      });
    });
  }
}

export default new MovimientoRepository();