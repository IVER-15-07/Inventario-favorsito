export class ErrorAplicacion extends Error {
  public readonly esOperacional: boolean;

  constructor(
    mensaje: string,
    public readonly codigoEstado: number = 500,
    esOperacional: boolean = true
  ) {
    super(mensaje);
    this.name = "ErrorAplicacion";
    this.esOperacional = esOperacional;

    Error.captureStackTrace(this, this.constructor);
  }

  // 400
  static solicitudIncorrecta(mensaje: string): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 400);
  }

  // 401
  static noAutorizado(mensaje: string = "No autorizado"): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 401);
  }

  // 403
  static prohibido(mensaje: string = "Acceso prohibido"): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 403);
  }

  // 404
  static noEncontrado(mensaje: string = "Recurso no encontrado"): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 404);
  }

  // 409
  static conflicto(mensaje: string): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 409);
  }

  // 500
  static interno(mensaje: string = "Error interno del servidor"): ErrorAplicacion {
    return new ErrorAplicacion(mensaje, 500);
  }
}