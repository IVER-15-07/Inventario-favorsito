import productoRepository from "../repositories/Productos.repository";
import { ErrorAplicacion } from "../../shared/errors/AppError";
import historialRepository from "../repositories/historial.repository";
export class ProductoService {

  async listarProductos() {
    return productoRepository.listar();
  }

  async crearProducto(data: {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
  }) {

    if (!data.nombre?.trim()) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El nombre del producto es requerido"
      );
    }

    if (data.precio <= 0) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El precio debe ser mayor a 0"
      );
    }

    if (data.stock < 0) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El stock no puede ser negativo"
      );
    }

    return productoRepository.crear(data);
  }


  async buscarPorNombre(nombre: string) {

    if (!nombre?.trim()) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El nombre de búsqueda es requerido"
      );
    }

    return productoRepository.buscarPorNombre(nombre);
  }








  async actualizarProducto(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
      stock?: number;
    }
  ) {

    const productoActual = await productoRepository.obtenerPorId(id);

    if (!productoActual) {
      throw ErrorAplicacion.noEncontrado(
        `Producto con ID ${id} no encontrado`
      );
    }

    // Validaciones
    if (data.precio !== undefined && data.precio <= 0) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El precio debe ser mayor a 0"
      );
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw ErrorAplicacion.solicitudIncorrecta(
        "El stock no puede ser negativo"
      );
    }

    // Detectar cambios
    const cambios: any[] = [];

    if (data.nombre && data.nombre !== productoActual.nombre) {
      cambios.push({
        cambio: "nombre",
        valorAnterior: productoActual.nombre,
        valorNuevo: data.nombre,
        historialProductoId: id,
      });
    }

    if (data.precio !== undefined && data.precio !== productoActual.precio) {
      cambios.push({
        cambio: "precio",
        valorAnterior: productoActual.precio.toString(),
        valorNuevo: data.precio.toString(),
        historialProductoId: id,
      });
    }

    // Actualizar producto
    const productoActualizado = await productoRepository.actualizar(id, data);

    // Registrar historial si hubo cambios
    if (cambios.length > 0) {
      await historialRepository.registrarCambios(cambios);
    }

    return productoActualizado;
  }













  async eliminarProducto(id: number) {

    const existe = await productoRepository.existe(id);

    if (!existe) {
      throw ErrorAplicacion.noEncontrado(
        `Producto con ID ${id} no encontrado`
      );
    }

    return productoRepository.eliminar(id);
  }
}

export default new ProductoService();