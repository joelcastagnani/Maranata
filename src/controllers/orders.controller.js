import Order from "../dao/models/order.model.js";
import { create, read } from "../services/orders.service.js";

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readOrders = async (req, res) => {
  try {
    const { page } = req.query;
    const all = await read(page);
    return res.status(200).json({ message: "Read!", response: all });
  } catch (error) {
    console.error("Error reading orders:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export { createOrder, readOrders };
