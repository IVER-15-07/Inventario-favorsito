import { Request, Response, NextFunction } from "express";
import { ErrorAplicacion } from "../shared/errors/AppError";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (err instanceof ErrorAplicacion) {
    return res.status(err.codigoEstado).json({
      exito: false,
      mensaje: err.message,
    });
  }

  console.error("Error no controlado:", err);

  return res.status(500).json({
    exito: false,
    mensaje: "Error interno del servidor",
  });
};