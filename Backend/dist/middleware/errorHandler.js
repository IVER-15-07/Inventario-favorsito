"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../shared/errors/AppError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError_1.ErrorAplicacion) {
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map