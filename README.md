# Inventario Favorcito

Sistema de inventario con arquitectura separada en **Backend** (Node.js + Express + Prisma + PostgreSQL) y **Frontend** (React + Vite).

## 1) Instrucciones de instalación

### Requisitos previos
- Node.js 20+
- npm 10+
- PostgreSQL 14+

### Clonar e instalar dependencias
```bash
git clone <URL_DEL_REPOSITORIO>
cd FAVORSITO

cd Backend
npm install

cd ../Frontend
npm install
```

### Configurar variables de entorno
1. En `Backend`, copiar `.env.example` a `.env`.
2. Ajustar los valores según tu entorno local.

### Crear base de datos y migraciones
Desde `Backend`:
```bash
npm run prisma:generate
npm run prisma:migrate
```

### Ejecutar proyecto en desarrollo
Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

Accesos esperados:
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`
- Frontend: `http://localhost:5173`

---

## 2) Variables de entorno

Variables usadas por el backend:

- `DATABASE_URL`: cadena de conexión PostgreSQL para Prisma.
- `PORT`: puerto del servidor (por defecto `3000`).
- `API_KEY`: llave para autenticación por encabezado `x-api-key` (middleware disponible).

Ejemplo en `Backend/.env.example`.

---

## 3) Script para creación de base de datos

### Opción A (recomendada con Prisma)
```bash
cd Backend
npm run prisma:migrate
```

### Opción B (SQL manual PostgreSQL)
```sql
CREATE DATABASE favorsito_db;
```

Luego ajustar `DATABASE_URL` con esa base, por ejemplo:
`postgresql://postgres:password@localhost:5432/favorsito_db?schema=public`

---

## 4) Decisiones técnicas

- **Backend con Express + TypeScript**: permite una API REST mantenible y tipada.
- **Prisma ORM**: simplifica acceso a datos, relaciones y migraciones con menor riesgo de errores SQL manuales.
- **Frontend con React + Vite**: desarrollo rápido y estructura modular para escalar vistas.
- **Separación por capas (controller/service/repository)**: mejora legibilidad, pruebas y mantenimiento.
- **Swagger/OpenAPI**: documentación viva del backend para integración y pruebas.

---

## 5) Justificación del diseño de base de datos

El esquema modela el flujo principal del negocio (inventario y pedidos):

- `Producto`: catálogo y control de stock.
- `Pedido`: entidad principal de compra/solicitud.
- `DetallePedido`: relación N:M entre pedidos y productos, con cantidad y precio aplicado.
- `MoviminetoInventario`: trazabilidad de entradas/salidas de inventario y vínculo opcional a pedido.
- `HistorialProductos`: auditoría de cambios relevantes en productos (ej. nombre/precio).

Razones del diseño:
- Se evita duplicar datos de productos en pedidos usando tabla de detalle.
- Se conserva historial operativo para auditoría y depuración.
- Se soporta consistencia de stock desde lógica de negocio y repositorio.

---

## 6) Medidas de seguridad implementadas

- **Helmet** en Express para cabeceras HTTP seguras.
- **CORS** habilitado para controlar consumo desde frontend.
- **Manejo centralizado de errores** para respuestas consistentes y evitar filtrar detalles internos.
- **Validación de datos de entrada** en servicios (IDs, cantidades, estados, stock).
- **Middleware de API Key** (`x-api-key`) disponible para proteger endpoints sensibles.
- **Uso de variables de entorno** para configuración sensible.

---

## 7) Publicación en GitHub y entrega

### Subir a repositorio público
1. Crear un repositorio público en GitHub (por ejemplo `inventario-favorcito`).
2. Desde la raíz del proyecto ejecutar:

```bash
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git branch -M main
git push -u origin main
```

### Enviar enlace por correo
Enviar a: `ivan@tufavorcito.com`

Asunto sugerido:
`Entrega proyecto Inventario Favorcito - 27/02/2026`

Cuerpo sugerido:
`Hola, comparto el repositorio público del proyecto: https://github.com/<TU_USUARIO>/<TU_REPO>`

---

## 8) Fecha límite

**Fecha límite de entrega: 27 de febrero de 2026 - 23:00**