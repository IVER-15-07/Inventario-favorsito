import {Router} from "express";
import  HistorialController  from "../controllers/Historial.controller";


const router = Router();

/**
 * @swagger
 * /api/historial/producto/{productoId}:
 *  get:
 *  summary: Obtener el historial de un producto específico
 *  tags: [Historial]
 *  parameters:
 *    - in: path    
 *     name: productoId
 *   required: true
 *   schema:    
 *   type: integer
 *          
 * responses:
 *  200:
 *    description: Historial obtenido exitosamente
 *  400:
 *   description: ID de producto inválido
 *  404:
 *  description: Producto no encontrado
 *  500:
 *  description: Error del servidor
 *  
 * */
router.get("/:productoId", HistorialController.obtenerHistorial);


export default router;