import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller.js";

const clientRouter = Router();

// Ruta para crear cliente (POST)
clientRouter.post("/", createClient);

// Ruta para obtener todos los clientes (GET)
clientRouter.get("/", getClients);

export default clientRouter;
