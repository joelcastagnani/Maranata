import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller.js";

const clientRouter = Router();


clientRouter.post("/", createClient);
clientRouter.get("/", getClients);

export default clientRouter;
