import express, { response } from "express";
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

server.use(cors({ origin: "http://localhost:8080" }));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, "client", "dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.use("/api", router);
server.listen(port, ready);
