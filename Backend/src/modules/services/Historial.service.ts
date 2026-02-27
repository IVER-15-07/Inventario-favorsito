import { ErrorAplicacion } from "../../shared/errors/AppError";

import HistorialRepository from "../repositories/historial.repository";


export class HistorialService {

    async obtenerPorProducto(productoId: number) {
        if (isNaN(productoId)) {
            throw ErrorAplicacion.solicitudIncorrecta("ID de producto inválido");
        }
        return await HistorialRepository.obtenerPorProducto(productoId);
    }

}