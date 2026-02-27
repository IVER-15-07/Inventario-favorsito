import express, {Express} from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { errorHandler } from "../src/middleware/errorHandler";

//rutas
import productoRoutes from "../src/modules/routes/productos.route.js";
import historialRoutes from "../src/modules/routes/Historial.route.js";
import ordenRoutes from "../src/modules/routes/orden.route.js";
import movimientosRoutes from "../src/modules/routes/movimientos.route.js";

const app: Express = express();

// 1. Seguridad y Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json());


// Esto crea la página web donde verás tu documentación
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "Inventario Favorcito API",
    })
);


app.use("/api/productos", productoRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/movimientos", movimientosRoutes);

app.use(errorHandler);

export default app;