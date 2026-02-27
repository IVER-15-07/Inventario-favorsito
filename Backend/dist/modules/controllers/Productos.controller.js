"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const Productos_service_1 = __importDefault(require("../services/Productos.service"));
const asyncHandler_1 = require("@/shared/utils/asyncHandler");
const AppError_1 = require("@/shared/errors/AppError");
class ProductoController {
    crear = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const producto = await Productos_service_1.default.crearProducto({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio),
            stock: Number(req.body.stock),
        });
        res.status(201).json({
            exito: true,
            mensaje: "Producto creado exitosamente",
            datos: producto,
        });
    });
    actualizar = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("ID inválido");
        }
        const data = {};
        const producto = await Productos_service_1.default.actualizarProducto(id, data);
        res.status(200).json({
            exito: true,
            mensaje: "Producto actualizado exitosamente",
            datos: producto,
        });
    });
    eliminar = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw AppError_1.ErrorAplicacion.solicitudIncorrecta("ID inválido");
        }
        await Productos_service_1.default.eliminarProducto(id);
        res.status(200).json({
            exito: true,
            mensaje: "Producto eliminado exitosamente",
        });
    });
    buscarPorNombre = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const nombre = req.query.nombre;
        const productos = await Productos_service_1.default.buscarPorNombre(nombre);
        res.status(200).json({
            exito: true,
            datos: productos,
            total: productos.length,
        });
    });
}
exports.ProductoController = ProductoController;
exports.default = new ProductoController();
//# sourceMappingURL=Productos.controller.js.map