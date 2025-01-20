import { Router } from "express";
import { createMockOrder, createOrder, createMockOrders, readOrders, readOneOrder, deleteOrder, updateOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/", createOrder);
ordersRouter.get("/mocks", createMockOrder);
ordersRouter.get("/mocks/:quantity", createMockOrders);
ordersRouter.get("/", readOrders);
ordersRouter.get("/:pid", readOneOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.put("/:id", updateOrder);


export default ordersRouter;
