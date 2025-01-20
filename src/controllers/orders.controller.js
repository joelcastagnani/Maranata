import Order from "../dao/models/order.model.js";
import {
  create,
  createMock,
  createMocks,
  read,
  deleteOrderService,
  updateOrderService,
} from "../services/orders.service.js";

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const readOneOrder = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await Order.findById(pid);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      return res.status(404).json({ message: "Not found!" });
    }
  } catch (error) {
    next(error);
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
const createMockOrder = async (req, res) => {
  try {
    const one = await createMock();
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const createMockOrders = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    const orders = await createMocks(quantity);
    return res.status(201).json({ message: "Created!", response: orders });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrderService(id);
    res.status(200).json({ message: "Orden eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedOrder = await updateOrderService(id, updateData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createOrder,
  readOneOrder,
  readOrders,
  createMockOrder,
  createMockOrders,
  deleteOrder,
  updateOrder,
};
