import { Router } from "express";
import ordenController from "../controllers/Orden.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ordenes
 *   description: API para gestionar pedidos
 */

/**
 * @swagger
 * /api/ordenes:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Ordenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreCliente
 *               - direccion
 *               - items
 *             properties:
 *               nombreCliente:
 *                 type: string
 *               direccion:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productoId
 *                     - cantidad
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error de validación
 *       409:
 *         description: Conflicto de inventario
 */
router.post("/crear", ordenController.crear);

/**
 * @swagger
 * /api/ordenes:
 *   get:
 *     summary: Listar pedidos
 *     tags: [Ordenes]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 */
router.get("/listar", ordenController.listar);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get("/obtener/:id", ordenController.obtenerPorId);

/**
 * @swagger
 * /api/ordenes/{id}/estado:
 *   patch:
 *     summary: Actualizar estado de pedido
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [PENDIENTE, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Transición de estado inválida
 */
router.patch("/actualizar/:id/estado", ordenController.actualizarEstado);
    
export default router;
