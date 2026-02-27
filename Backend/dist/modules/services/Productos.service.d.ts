export declare class ProductoService {
    crearProducto(data: {
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
    }): Promise<any>;
    buscarPorNombre(nombre: string): Promise<any>;
    actualizarProducto(id: number, data: {
        nombre?: string;
        descripcion?: string;
        precio?: number;
        stock?: number;
    }): Promise<any>;
    eliminarProducto(id: number): Promise<any>;
}
declare const _default: ProductoService;
export default _default;
//# sourceMappingURL=Productos.service.d.ts.map