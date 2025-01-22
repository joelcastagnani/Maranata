import Product from "../dao/models/product.model.js";
import {
  create,
  createMock,
  createMocks,
  read,
  deleteProductService,
  updateProductService,
} from "../services/products.service.js";

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await Product.findById(pid);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    next(error);
  }
};
const readProducts = async (req, res) => {
  try {
    const { page } = req.query;
    const all = await read(page);
    return res.status(200).json({ message: "Read!", response: all });
  } catch (error) {
    console.error("Error reading products:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const createMockProduct = async (req, res) => {
  try {
    const one = await createMock();
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const createMockProducts = async (req, res) => {
  try {
    const { quantity } = req.params;
    const prods = await createMocks(quantity);
    return res.status(201).json({ message: "Created!", response: prods });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProductService(id);
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Falta el ID del producto" });
    }

    const updatedProduct = await updateProductService(id, updateData);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto actualizado con éxito", updatedProduct });
  } catch (error) {
    console.error("Error actualizando el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};


export { createProduct, readProducts, createMockProduct, createMockProducts, readOneProduct, deleteProduct, updateProduct  };
