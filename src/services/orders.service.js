import Order from "../dao/models/order.model.js";
import { createMockOrder } from "../utils/mocks.util.js";

const create = async (data) => {
  try {
    const one = await Order.create(data);
    return one;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw new Error("Error creando el pedido. Verifica los datos enviados.");
  }
};
const read = async (page) => {
  const all = await Order.paginate(
    {},
    { page, sort: { name: 1 }, select: "-__v -createdAt -updatedAt -__v" }
  );
  return all;
};
const createMock = async () => {
  const data = createMockOrder();
  const one = await Order.create(data);
  return one;
};
const createMocks = async (quantity) => {
  const orders = [];
  for (let index = 0; index < quantity; index++) {
    const one = await createMock();
    orders.push(one);
  }
  return orders;
};
const deleteOrderService = async (id) => {
  return await Order.findByIdAndDelete(id);
};
const updateOrderService = async (id, updateData) => {
  return await Order.findByIdAndUpdate(id, updateData, { new: true });
};



export { create, read, createMock, createMocks, deleteOrderService, updateOrderService };
