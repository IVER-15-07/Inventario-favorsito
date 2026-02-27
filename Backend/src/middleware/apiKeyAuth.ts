import { NextFunction, Request, Response } from "express";

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    const configuredApiKey = process.env.API_KEY;

    if (!configuredApiKey) {
        return res.status(500).json({
            exito: false,
            mensaje: "API_KEY no está configurada en el servidor",
        });
    }

    const requestApiKey = req.header("x-api-key");

    if (!requestApiKey || requestApiKey !== configuredApiKey) {
        return res.status(401).json({
            exito: false,
            mensaje: "No autorizado. API Key inválida o ausente",
        });
    }

    next();
};
