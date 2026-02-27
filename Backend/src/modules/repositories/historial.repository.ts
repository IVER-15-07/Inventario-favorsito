import prisma from "../../config/prisma";

export class HistorialRepository {

    historrialProducto = async (historialProductoId: number) => {
        return await prisma.historialProductos.findMany({
            where: { historialProductoId },
            orderBy: { fecha: "desc" },
        });
    }


    async obtenerPorProducto(productoId: number) {
        return prisma.historialProductos.findMany({
            where: { historialProductoId: productoId },
            orderBy: { fecha: "desc" },
        });
    }



}


export default new HistorialRepository();