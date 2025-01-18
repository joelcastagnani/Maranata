import { config } from "dotenv";
import argsUtil from "./args.utils.js";

const { mode } = argsUtil;

const path = ".env." + mode;

config({ path });

const env = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  // ACA DEBERIAN ESTAR TODAS LAS VARIABLES DE ENTORNO PARA CADA ENTORNO (nose que es eso)
};

export default env;
