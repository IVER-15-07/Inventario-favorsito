export declare class ProductoRepository {
    crear(data: {
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
    }): Promise<any>;
    buscarPorNombre(nombre: string): Promise<any>;
    actualizar(id: number, data: {
        nombre?: string;
        descripcion?: string;
        precio?: number;
        stock?: number;
    }): Promise<any>;
    eliminar(id: number): Promise<any>;
    existe(id: number): Promise<boolean>;
    obtenerStockBajo(cantidad?: number): Promise<any>;
    actualizarStock(id: number, cantidad: number): Promise<any>;
}
declare const _default: ProductoRepository;
export default _default;
//# sourceMappingURL=Productos.repository.d.ts.map