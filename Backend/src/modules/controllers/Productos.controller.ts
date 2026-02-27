import { Request, Response } from "express";
import productoService from "../services/Productos.service";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { ErrorAplicacion } from "@/shared/errors/AppError";

export class ProductoController {

    listar = asyncHandler(async (req: Request, res: Response) => {
        const productos = await productoService.listarProductos();
        res.status(200).json({
            exito: true,
            datos: productos,
            total: productos.length,
        });
    });

    crear = asyncHandler(async (req: Request, res: Response) => {

        const producto = await productoService.crearProducto({
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

    actualizar = asyncHandler(async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const { nombre, descripcion, precio, stock } = req.body;

        const data = {
            nombre,
            descripcion,
            precio: precio !== undefined ? Number(precio) : undefined,
            stock: stock !== undefined ? Number(stock) : undefined,
        };

        const producto = await productoService.actualizarProducto(id, data);

        res.status(200).json({
            exito: true,
            mensaje: "Producto actualizado exitosamente",
            datos: producto,
        });
    });

    eliminar = asyncHandler(async (req: Request, res: Response) => {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            throw ErrorAplicacion.solicitudIncorrecta("ID inválido");
        }

        await productoService.eliminarProducto(id);

        res.status(200).json({
            exito: true,
            mensaje: "Producto eliminado exitosamente",
        });
    });


    buscarPorNombre = asyncHandler(async (req: Request, res: Response) => {

        const nombre = req.query.nombre as string;

        const productos = await productoService.buscarPorNombre(nombre);

        res.status(200).json({
            exito: true,
            datos: productos,
            total: productos.length,
        });
    });

}

export default new ProductoController();