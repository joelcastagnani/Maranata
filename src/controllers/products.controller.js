import {
  create,
  createMock,
  createMocks,
  read,
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

export { createProduct, readProducts, createMockProduct, createMockProducts };
