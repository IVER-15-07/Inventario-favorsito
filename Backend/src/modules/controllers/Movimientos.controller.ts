import { Request, Response } from "express";
import { TipoMovimiento } from "@prisma/client";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { ErrorAplicacion } from "@/shared/errors/AppError";
import movimientoService from "../services/Movimientos.service";

class MovimientoController {
    listar = asyncHandler(async (_req: Request, res: Response) => {
        const movimientos = await movimientoService.listarMovimientos();
        res.status(200).json({
            exito: true,
            datos: movimientos,
            total: movimientos.length,
        });
    });

    registrar = asyncHandler(async (req: Request, res: Response) => {
        const { productoId, cantidad, tipo, motivo, pedidoId } = req.body as {
            productoId?: number;
            cantidad?: number;
            tipo?: TipoMovimiento;
            motivo?: string;
            pedidoId?: number;
        };

        if (!tipo || !Object.values(TipoMovimiento).includes(tipo)) {
            throw ErrorAplicacion.solicitudIncorrecta("Tipo de movimiento inválido");
        }

        const movimiento = await movimientoService.registrarMovimiento({
            productoId: Number(productoId),
            cantidad: Number(cantidad),
            tipo,
            motivo: String(motivo ?? ""),
            ...(pedidoId !== undefined && { pedidoId: Number(pedidoId) }),
        });
        res.status(201).json({
            exito: true,
            mensaje: "Movimiento registrado exitosamente",
            datos: movimiento,
        });
    });
}

export default new MovimientoController();