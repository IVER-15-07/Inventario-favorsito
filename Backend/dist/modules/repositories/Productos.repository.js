"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class ProductoRepository {
    async crear(data) {
        return await prisma_1.default.producto.create({
            data,
        });
    }
    async buscarPorNombre(nombre) {
        return await prisma_1.default.producto.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: "insensitive",
                },
            },
        });
    }
    async actualizar(id, data) {
        return await prisma_1.default.producto.update({
            where: { id },
            data,
        });
    }
    async eliminar(id) {
        return await prisma_1.default.producto.delete({
            where: { id },
        });
    }
    async existe(id) {
        const count = await prisma_1.default.producto.count({
            where: { id },
        });
        return count > 0;
    }
    // Obtener productos con stock bajo
    async obtenerStockBajo(cantidad = 10) {
        return await prisma_1.default.producto.findMany({
            where: {
                stock: {
                    lte: cantidad,
                },
            },
            orderBy: {
                stock: "asc",
            },
        });
    }
    // Actualizar solo el stock
    async actualizarStock(id, cantidad) {
        return await prisma_1.default.producto.update({
            where: { id },
            data: {
                stock: cantidad,
            },
        });
    }
}
exports.ProductoRepository = ProductoRepository;
exports.default = new ProductoRepository();
//# sourceMappingURL=Productos.repository.js.map