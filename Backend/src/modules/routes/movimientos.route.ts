import { Router } from "express";
import movimientoController from "../controllers/Movimientos.controller";

const router = Router();

router.get("/listar", movimientoController.listar);
router.post("/registrar", movimientoController.registrar);

export default router;