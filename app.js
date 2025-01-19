import express from "express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtils from "./src/utils/args.utils.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const server = express();
const port = env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ready = async () => {
  const mode = argsUtils.mode;
  console.log(`Server corriendo en puerto ${port} en modo ${mode} (app.js)`);
  await dbConnect();
};

// Middleware de CORS
// server.use(cors({ origin: "http://localhost:8080" }));
server.use(cors());

// Middleware para parsear JSON y formularios
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Rutas de la API
server.use("/api", router);

// Servir archivos estáticos después de las rutas de la API
server.use(express.static(path.join(__dirname, "client", "dist")));

// Manejar rutas no encontradas con el wildcard
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Iniciar el servidor
server.listen(port, ready);
