import Order from "../dao/models/order.model.js";
import { createMockOrder } from "../utils/mocks.util.js";

const create = async (data) => {
  try {
    if (!data.order || !Array.isArray(data.order) || data.order.length === 0) {
      throw new Error("La orden debe contener al menos un producto.");
    }

    data.totalPrice = data.order.reduce((total, item) => {
      if (!item.quantity || !item.price) {
        throw new Error(
          "Cada producto debe tener una cantidad y un precio válido."
        );
      }
      return total + item.quantity * item.price;
    }, 0);

    const one = await Order.create(data);

    console.log("✅ Orden creada con éxito:", one);
    return one;
  } catch (error) {
    console.error("❌ Error al crear el pedido:", error.message);
    throw new Error("Error creando el pedido. Verifica los datos enviados.");
  }
};
const read = async (page) => {
  const all = await Order.paginate(
    {},
    { page, sort: { name: 1 }, select: "-__v -updatedAt" } 
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
  const order = await Order.findById(id);
  if (!order) {
    throw new Error("Pedido no encontrado");
  }
  return await Order.findByIdAndDelete(id);
};
const updateOrderService = async (id, updateData) => {
  return await Order.findByIdAndUpdate(id, updateData, { new: true });
};

export {
  create,
  read,
  createMock,
  createMocks,
  deleteOrderService,
  updateOrderService,
};
