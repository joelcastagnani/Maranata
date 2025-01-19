import { Router } from "express";
import { createOrder, readOrders } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/", createOrder);
ordersRouter.get("/", readOrders);




export default ordersRouter;
