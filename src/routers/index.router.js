import { Router } from "express";
import ordersRouter from "./orders.router.js";

const router = Router();

router.use("/orders", ordersRouter);


export default router;