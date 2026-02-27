import prisma from "../../config/prisma";

type HistorialCambioInput = {
    cambio: string;
    valorAnterior?: string | null;
    valorNuevo?: string | null;
    historialProductoId: number;
};

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

    async registrarCambios(cambios: HistorialCambioInput[]) {
        if (!Array.isArray(cambios) || cambios.length === 0) {
            return { count: 0 };
        }

        return prisma.historialProductos.createMany({
            data: cambios.map((cambio) => ({
                cambio: cambio.cambio,
                valorAnterior: cambio.valorAnterior ?? null,
                valorNuevo: cambio.valorNuevo ?? null,
                historialProductoId: cambio.historialProductoId,
            })),
        });
    }



}


export default new HistorialRepository();