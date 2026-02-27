import prisma from "../../config/prisma";

export class ProductoRepository {

    async listar() {
        return await prisma.producto.findMany();
    }

    async crear(data: {
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
    }) {
        return await prisma.producto.create({
            data,
        });
    }


    async buscarPorNombre(nombre: string) {
        return await prisma.producto.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: "insensitive",
                },
            },
        });
    }


    async actualizar(
        id: number,
        data: {
            nombre?: string;
            descripcion?: string;
            precio?: number;
            stock?: number;
        }
    ) {
        return await prisma.producto.update({
            where: { id },
            data,
        });
    }


    async eliminar(id: number) {
        return await prisma.producto.delete({
            where: { id },
        });
    }


    async existe(id: number): Promise<boolean> {
        const producto = await prisma.producto.findUnique({
            where: { id },
            select: { id: true },
        });

        return !!producto;
    }


    async obtenerPorId(id: number) {    
        return await prisma.producto.findUnique({
            where: { id },
        });
    }
















    // Obtener productos con stock bajo
    async obtenerStockBajo(cantidad: number = 10) {
        return await prisma.producto.findMany({
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
    async actualizarStock(id: number, cantidad: number) {
        return await prisma.producto.update({
            where: { id },
            data: {
                stock: cantidad,
            },
        });
    }

    // Verificar si existe un producto

}

export default new ProductoRepository();
