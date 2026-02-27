"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const Productos_repository_1 = __importDefault(require("../repositories/Productos.repository"));
const AppError_1 = require("../../shared/errors/AppError");
class ProductoService {
    async crearProducto(data) {
        if (!data.nombre?.trim()) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El nombre del producto es requerido");
        }
        if (data.precio <= 0) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El precio debe ser mayor a 0");
        }
        if (data.stock < 0) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El stock no puede ser negativo");
        }
        return Productos_repository_1.default.crear(data);
    }
    async buscarPorNombre(nombre) {
        if (!nombre?.trim()) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El nombre de búsqueda es requerido");
        }
        return Productos_repository_1.default.buscarPorNombre(nombre);
    }
    async actualizarProducto(id, data) {
        const existe = await Productos_repository_1.default.existe(id);
        if (!existe) {
            throw AppError_1.ErrorAplicacion.noEncontrado(`Producto con ID ${id} no encontrado`);
        }
        if (data.precio !== undefined && data.precio <= 0) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El precio debe ser mayor a 0");
        }
        if (data.stock !== undefined && data.stock < 0) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("El stock no puede ser negativo");
        }
        return Productos_repository_1.default.actualizar(id, data);
    }
    async eliminarProducto(id) {
        const existe = await Productos_repository_1.default.existe(id);
        if (!existe) {
            throw AppError_1.ErrorAplicacion.noEncontrado(`Producto con ID ${id} no encontrado`);
        }
        return Productos_repository_1.default.eliminar(id);
    }
}
exports.ProductoService = ProductoService;
exports.default = new ProductoService();
//# sourceMappingURL=Productos.service.js.map