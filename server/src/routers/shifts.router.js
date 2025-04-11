import { Router } from "express";
import { closeShift, getOpenShift } from "../controllers/shifts.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const shiftRouter = Router();

shiftRouter.get("/abierto", verifyToken, getOpenShift);
shiftRouter.put("/:id/close", verifyToken, closeShift);

export default shiftRouter;
