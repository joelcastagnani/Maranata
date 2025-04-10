import { Router } from "express";
import {
  createMockOrder,
  createOrder,
  createMockOrders,
  readOrders,
  readOneOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orders.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const ordersRouter = Router();

// 🛡️ Rutas protegidas con middleware de autenticación
ordersRouter.post("/", verifyToken, createOrder);
// ordersRouter.get("/mocks", verifyToken, createMockOrder);
// ordersRouter.get("/mocks/:quantity", verifyToken, createMockOrders);

// 📂 Rutas públicas (sin protección por token)
ordersRouter.get("/mocks", createMockOrder);
ordersRouter.get("/mocks/:quantity", createMockOrders);
ordersRouter.get("/", readOrders);
ordersRouter.get("/:pid", readOneOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.put("/:id", updateOrder);

export default ordersRouter;
