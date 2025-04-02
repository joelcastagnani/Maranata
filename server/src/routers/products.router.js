import { Router } from "express";
import {
  createMockProduct,
  createMockProducts,
  createProduct,
  readProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.post("/", createProduct);
productsRouter.get("/mocks", createMockProduct);
productsRouter.get("/mocks/:quantity", createMockProducts);
productsRouter.get("/", readProducts);
productsRouter.delete("/:id", deleteProduct);
productsRouter.put("/:id", updateProduct);

export default productsRouter;
