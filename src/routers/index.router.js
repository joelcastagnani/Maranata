import { Router } from "express";
import ordersRouter from "./orders.router.js";
import productsRouter from "./products.router.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use('/auth', authRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);


export default router;