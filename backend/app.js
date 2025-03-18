import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import argsUtils from "./src/utils/args.utils.js";
import loggerUtil from "./src/utils/logger.util.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import router from './src/routers/index.router.js';


const server = express();
const port = 8080;

server.use(express.json());
server.use("/api", router);

const ready = async () => {
  const mode = argsUtils.mode;
  loggerUtil.INFO(`Server corriendo en puerto ${port} en modo ${mode}`);
  await dbConnect();
}; 

server.listen(port, ready);
