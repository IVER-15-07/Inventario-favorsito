import { asyncHandler } from "@/shared/utils/asyncHandler";
import { ErrorAplicacion } from "@/shared/errors/AppError";
import { Request, Response } from "express";
import { HistorialService } from "../services/historial.service";


export class HistorialController {

    obtenerHistorial = asyncHandler(async (req: Request, res: Response) => {

        const productoId = Number(req.params.productoId);
        const historial = await new HistorialService().obtenerPorProducto(productoId);  
        res.status(200).json({
            exito: true,
            datos: historial,
            total: historial.length,
        });

    });

}


export default new HistorialController();

