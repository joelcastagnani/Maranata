import { Router } from "express";
import { createMockOrder, createOrder, createMockOrders, readOrders, readOneOrder, deleteOrder, updateOrder } from "../controllers/orders.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const ordersRouter = Router();

ordersRouter.post("/", verifyToken, createOrder);
ordersRouter.get("/mocks", verifyToken, createMockOrder);
ordersRouter.get("/mocks/:quantity", verifyToken, createMockOrders);
ordersRouter.get("/", readOrders);
ordersRouter.get("/:pid", readOneOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.put("/:id", updateOrder);


export default ordersRouter;
