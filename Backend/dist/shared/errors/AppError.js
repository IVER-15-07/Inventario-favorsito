"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAplicacion = void 0;
class ErrorAplicacion extends Error {
    codigoEstado;
    esOperacional;
    constructor(mensaje, codigoEstado = 500, esOperacional = true) {
        super(mensaje);
        this.codigoEstado = codigoEstado;
        this.name = "ErrorAplicacion";
        this.esOperacional = esOperacional;
        Error.captureStackTrace(this, this.constructor);
    }
    // 400
    static solicitudIncorrecta(mensaje) {
        return new ErrorAplicacion(mensaje, 400);
    }
    // 401
    static noAutorizado(mensaje = "No autorizado") {
        return new ErrorAplicacion(mensaje, 401);
    }
    // 403
    static prohibido(mensaje = "Acceso prohibido") {
        return new ErrorAplicacion(mensaje, 403);
    }
    // 404
    static noEncontrado(mensaje = "Recurso no encontrado") {
        return new ErrorAplicacion(mensaje, 404);
    }
    // 409
    static conflicto(mensaje) {
        return new ErrorAplicacion(mensaje, 409);
    }
    // 500
    static interno(mensaje = "Error interno del servidor") {
        return new ErrorAplicacion(mensaje, 500);
    }
}
exports.ErrorAplicacion = ErrorAplicacion;
//# sourceMappingURL=AppError.js.map