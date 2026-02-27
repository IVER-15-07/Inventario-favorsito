import { Request, Response } from "express";
import { EstadoPedido } from "@prisma/client";
import ordenService from "../services/Orden.service";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { ErrorAplicacion } from "@/shared/errors/AppError";

export class OrdenController {
  crear = asyncHandler(async (req: Request, res: Response) => {
    const { nombreCliente, direccion, items } = req.body;

    const pedido = await ordenService.crearPedido({
      nombreCliente,
      direccion,
      items,
    });

    res.status(201).json({
      exito: true,
      mensaje: "Pedido creado exitosamente",
      datos: pedido,
    });
  });

  listar = asyncHandler(async (_req: Request, res: Response) => {
    const pedidos = await ordenService.listarPedidos();

    res.status(200).json({
      exito: true,
      datos: pedidos,
      total: pedidos.length,
    });
  });

  obtenerPorId = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw ErrorAplicacion.solicitudIncorrecta("ID de pedido inválido");
    }

    const pedido = await ordenService.obtenerPedidoPorId(id);

    res.status(200).json({
      exito: true,
      datos: pedido,
    });
  });

  actualizarEstado = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { estado } = req.body as { estado?: EstadoPedido };

    if (Number.isNaN(id)) {
      throw ErrorAplicacion.solicitudIncorrecta("ID de pedido inválido");
    }

    if (!estado || !Object.values(EstadoPedido).includes(estado)) {
      throw ErrorAplicacion.solicitudIncorrecta("Estado de pedido inválido");
    }

    const pedido = await ordenService.actualizarEstado(id, estado);

    res.status(200).json({
      exito: true,
      mensaje: "Estado de pedido actualizado",
      datos: pedido,
    });
  });
}

export default new OrdenController();
