const swaggerSpec = {
	openapi: "3.0.0",
	info: {
		title: "Inventario Favorcito API",
		version: "1.0.0",
		description: "Documentación de la API de inventario",
	},
	servers: [{ url: "http://localhost:3000" }],
	paths: {
		"/api/productos/listar": {
			get: {
				tags: ["Productos"],
				summary: "Listar todos los productos",
				responses: {
					"200": {
						description: "Lista de productos obtenida exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										total: { type: "integer", example: 2 },
										datos: {
											type: "array",
											items: { $ref: "#/components/schemas/Producto" },
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/productos/crear": {
			post: {
				tags: ["Productos"],
				summary: "Crear un nuevo producto",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["nombre", "descripcion", "precio", "stock"],
								properties: {
									nombre: { type: "string", example: "Arroz" },
									descripcion: { type: "string", example: "Arroz premium 1kg" },
									precio: { type: "number", example: 4.5 },
									stock: { type: "integer", example: 100, minimum: 0 },
								},
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Producto creado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: { type: "string", example: "Producto creado exitosamente" },
										datos: { $ref: "#/components/schemas/Producto" },
									},
								},
							},
						},
					},
					"400": { description: "Error de validación" },
				},
			},
		},
		"/api/productos/buscar": {
			get: {
				tags: ["Productos"],
				summary: "Buscar productos por nombre",
				parameters: [
					{
						in: "query",
						name: "nombre",
						required: true,
						schema: { type: "string" },
						description: "Texto a buscar en el nombre del producto",
					},
				],
				responses: {
					"200": {
						description: "Productos encontrados",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										total: { type: "integer", example: 1 },
										datos: {
											type: "array",
											items: { $ref: "#/components/schemas/Producto" },
										},
									},
								},
							},
						},
					},
					"400": { description: "Parámetro de búsqueda inválido" },
				},
			},
		},
		"/api/productos/actualizar/{id}": {
			put: {
				tags: ["Productos"],
				summary: "Actualizar un producto",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "integer" },
						description: "ID del producto",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									nombre: { type: "string" },
									descripcion: { type: "string" },
									precio: { type: "number", minimum: 0.01 },
									stock: { type: "integer", minimum: 0 },
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Producto actualizado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: {
											type: "string",
											example: "Producto actualizado exitosamente",
										},
										datos: { $ref: "#/components/schemas/Producto" },
									},
								},
							},
						},
					},
					"400": { description: "Datos inválidos" },
					"404": { description: "Producto no encontrado" },
				},
			},
		},
		"/api/productos/eliminar/{id}": {
			delete: {
				tags: ["Productos"],
				summary: "Eliminar un producto",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "integer" },
						description: "ID del producto",
					},
				],
				responses: {
					"200": {
						description: "Producto eliminado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: {
											type: "string",
											example: "Producto eliminado exitosamente",
										},
									},
								},
							},
						},
					},
					"400": { description: "ID inválido" },
					"404": { description: "Producto no encontrado" },
				},
			},
		},
		"/api/ordenes/crear": {
			post: {
				tags: ["Ordenes"],
				summary: "Crear un nuevo pedido",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["nombreCliente", "direccion", "items"],
								properties: {
									nombreCliente: { type: "string", example: "María López" },
									direccion: { type: "string", example: "Av. Central 123" },
									items: {
										type: "array",
										minItems: 1,
										items: { $ref: "#/components/schemas/ItemPedidoInput" },
									},
								},
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Pedido creado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: { type: "string", example: "Pedido creado exitosamente" },
										datos: { $ref: "#/components/schemas/Pedido" },
									},
								},
							},
						},
					},
					"400": { description: "Error de validación" },
					"404": { description: "Producto no encontrado" },
					"409": { description: "Conflicto de inventario" },
				},
			},
		},
		"/api/ordenes/listar": {
			get: {
				tags: ["Ordenes"],
				summary: "Listar pedidos",
				responses: {
					"200": {
						description: "Lista de pedidos obtenida exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										total: { type: "integer", example: 2 },
										datos: {
											type: "array",
											items: { $ref: "#/components/schemas/Pedido" },
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/ordenes/obtener/{id}": {
			get: {
				tags: ["Ordenes"],
				summary: "Obtener pedido por ID",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "integer" },
						description: "ID del pedido",
					},
				],
				responses: {
					"200": {
						description: "Pedido encontrado",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										datos: { $ref: "#/components/schemas/PedidoConProducto" },
									},
								},
							},
						},
					},
					"400": { description: "ID inválido" },
					"404": { description: "Pedido no encontrado" },
				},
			},
		},
		"/api/ordenes/actualizar/{id}/estado": {
			patch: {
				tags: ["Ordenes"],
				summary: "Actualizar estado de pedido",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "integer" },
						description: "ID del pedido",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["estado"],
								properties: {
									estado: {
										type: "string",
										enum: ["PENDIENTE", "PROCESANDO", "ENVIADO", "ENTREGADO", "CANCELADO"],
										example: "PROCESANDO",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Estado actualizado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: { type: "string", example: "Estado de pedido actualizado" },
										datos: { $ref: "#/components/schemas/Pedido" },
									},
								},
							},
						},
					},
					"400": { description: "Transición de estado inválida o ID inválido" },
					"404": { description: "Pedido no encontrado" },
				},
			},
		},
		"/api/historial/{productoId}": {
			get: {
				tags: ["Historial"],
				summary: "Obtener historial de un producto",
				description: "Retorna el historial de cambios de un producto específico.",
				parameters: [
					{
						in: "path",
						name: "productoId",
						required: true,
						schema: { type: "integer" },
						description: "ID del producto",
					},
				],
				responses: {
					"200": {
						description: "Historial obtenido exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										total: { type: "integer", example: 2 },
										datos: {
											type: "array",
											items: { $ref: "#/components/schemas/HistorialProducto" },
										},
									},
								},
							},
						},
					},
					"400": { description: "ID de producto inválido" },
				},
			},
		},
		"/api/movimientos/listar": {
			get: {
				tags: ["Movimientos"],
				summary: "Listar movimientos de inventario",
				description: "Retorna el historial de movimientos ordenado por fecha descendente.",
				responses: {
					"200": {
						description: "Movimientos obtenidos correctamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										total: { type: "integer", example: 2 },
										datos: {
											type: "array",
											items: { $ref: "#/components/schemas/MovimientoInventario" },
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/movimientos/registrar": {
			post: {
				tags: ["Movimientos"],
				summary: "Registrar un movimiento de inventario",
				description:
					"Registra una entrada o salida y actualiza el stock del producto de forma transaccional.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["productoId", "cantidad", "tipo", "motivo"],
								properties: {
									productoId: { type: "integer", example: 1 },
									cantidad: { type: "integer", example: 10, minimum: 1 },
									tipo: {
										type: "string",
										enum: ["ENTRADA", "SALIDA"],
										example: "ENTRADA",
									},
									motivo: { type: "string", example: "Ajuste de inventario" },
									pedidoId: { type: "integer", nullable: true, example: 12 },
								},
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Movimiento registrado exitosamente",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										exito: { type: "boolean", example: true },
										mensaje: {
											type: "string",
											example: "Movimiento registrado exitosamente",
										},
										datos: { $ref: "#/components/schemas/MovimientoInventario" },
									},
								},
							},
						},
					},
					"400": {
						description: "Datos inválidos",
					},
					"404": {
						description: "Producto no encontrado",
					},
					"409": {
						description: "Conflicto de negocio (por ejemplo, stock insuficiente)",
					},
				},
			},
		},
	},
	components: {
		schemas: {
			HistorialProducto: {
				type: "object",
				properties: {
					id: { type: "integer", example: 1 },
					historialProductoId: { type: "integer", example: 1 },
					cambio: { type: "string", example: "precio" },
					valorAnterior: { type: "string", nullable: true, example: "4.5" },
					valorNuevo: { type: "string", nullable: true, example: "5.0" },
					fecha: {
						type: "string",
						format: "date-time",
						example: "2026-02-27T12:00:00.000Z",
					},
				},
			},
			ItemPedidoInput: {
				type: "object",
				required: ["productoId", "cantidad"],
				properties: {
					productoId: { type: "integer", example: 1 },
					cantidad: { type: "integer", example: 2, minimum: 1 },
				},
			},
			DetallePedido: {
				type: "object",
				properties: {
					id: { type: "integer", example: 1 },
					pedidoId: { type: "integer", example: 10 },
					productoId: { type: "integer", example: 1 },
					cantidad: { type: "integer", example: 2 },
					precio: { type: "number", example: 4.5 },
				},
			},
			DetallePedidoConProducto: {
				allOf: [
					{ $ref: "#/components/schemas/DetallePedido" },
					{
						type: "object",
						properties: {
							producto: { $ref: "#/components/schemas/Producto" },
						},
					},
				],
			},
			Pedido: {
				type: "object",
				properties: {
					id: { type: "integer", example: 10 },
					nombreCliente: { type: "string", example: "María López" },
					direccion: { type: "string", example: "Av. Central 123" },
					estado: {
						type: "string",
						enum: ["PENDIENTE", "PROCESANDO", "ENVIADO", "ENTREGADO", "CANCELADO"],
						example: "PENDIENTE",
					},
					creadoen: {
						type: "string",
						format: "date-time",
						example: "2026-02-27T12:00:00.000Z",
					},
					detalles: {
						type: "array",
						items: { $ref: "#/components/schemas/DetallePedido" },
					},
				},
			},
			PedidoConProducto: {
				allOf: [
					{ $ref: "#/components/schemas/Pedido" },
					{
						type: "object",
						properties: {
							detalles: {
								type: "array",
								items: { $ref: "#/components/schemas/DetallePedidoConProducto" },
							},
						},
					},
				],
			},
			Producto: {
				type: "object",
				properties: {
					id: { type: "integer", example: 1 },
					nombre: { type: "string", example: "Arroz" },
					descripcion: { type: "string", example: "Arroz premium 1kg" },
					precio: { type: "number", example: 4.5 },
					stock: { type: "integer", example: 100 },
				},
			},
			MovimientoInventario: {
				type: "object",
				properties: {
					id: { type: "integer", example: 1 },
					productoId: { type: "integer", example: 1 },
					pedidoId: { type: "integer", nullable: true, example: 12 },
					cantidad: { type: "integer", example: 10 },
					tipo: {
						type: "string",
						enum: ["ENTRADA", "SALIDA"],
						example: "SALIDA",
					},
					motivo: { type: "string", example: "Venta" },
					fecha: {
						type: "string",
						format: "date-time",
						example: "2026-02-27T12:00:00.000Z",
					},
					producto: {
						type: "object",
						nullable: true,
						additionalProperties: true,
					},
					pedido: {
						type: "object",
						nullable: true,
						additionalProperties: true,
					},
				},
			},
		},
	},
};

export default swaggerSpec;
