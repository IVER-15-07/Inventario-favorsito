export declare class ErrorAplicacion extends Error {
    readonly codigoEstado: number;
    readonly esOperacional: boolean;
    constructor(mensaje: string, codigoEstado?: number, esOperacional?: boolean);
    static solicitudIncorrecta(mensaje: string): ErrorAplicacion;
    static noAutorizado(mensaje?: string): ErrorAplicacion;
    static prohibido(mensaje?: string): ErrorAplicacion;
    static noEncontrado(mensaje?: string): ErrorAplicacion;
    static conflicto(mensaje: string): ErrorAplicacion;
    static interno(mensaje?: string): ErrorAplicacion;
}
//# sourceMappingURL=AppError.d.ts.map