import { Router } from "express";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);


export default router;