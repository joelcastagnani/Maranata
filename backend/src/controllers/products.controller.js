import Product from "../models/product.model.js";
import { create, read } from "../services/products.service.js";

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};
const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await Product.findById(pid);
    if (!one) {
      throw CustomError.new(notFound);
    }
    return res.status(200).json({ message: "Read!", response: one });
  } catch (error) {
    next(error);
  }
};
const readProducts = async (req, res, next) => {
  try {
    const { page } = req.query;
    const all = await read(page);
    if (all.docs.length === 0) {
      throw CustomError.new(notFound);
    }
    return res.status(200).json({ message: "Read!", response: all });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(pid, data, {
      new: true,
    });

    if (!updatedProduct) {
      throw CustomError.new(notFound);
    }

    return res
      .status(200)
      .json({ message: "Updated!", response: updatedProduct });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      throw CustomError.new(notFound);
    }

    return res
      .status(200)
      .json({ message: "Deleted!", response: deletedProduct });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  readProducts,
  readOneProduct,
  updateProduct,
  deleteProduct,
};
