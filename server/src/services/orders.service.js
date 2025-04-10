import Order from "../dao/models/order.model.js";
import Client from "../dao/models/client.model.js";
import Product from "../dao/models/product.model.js";
import { createMockOrder } from "../utils/mocks.util.js";

const create = async (data) => {
  try {
    if (!data.order || !Array.isArray(data.order) || data.order.length === 0) {
      throw new Error("La orden debe contener al menos un producto.");
    }

    // Obtener los precios directamente desde la base de datos
    const productIds = data.order.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== data.order.length) {
      throw new Error("Uno o más productos no existen.");
    }

    // Calcular totalPrice con los precios actuales
    let totalPrice = 0;
    const enrichedOrder = data.order.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      const price = product.price;
      totalPrice += item.quantity * price;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
      };
    });

    const newOrder = await Order.create({
      order: enrichedOrder,
      totalPrice,
      name: data.name,
      address: data.address,
      phone: data.phone,
    });

    // Buscar o crear cliente
    let client = await Client.findOne({ address: data.address });

    if (!client) {
      if (!data.name || !data.address) {
        throw new Error("Faltan datos para crear el cliente.");
      }

      client = await Client.create({
        name: data.name,
        phone: data.phone,
        address: data.address,
        orders: [newOrder._id], // Asociamos directamente
      });
    } else {
      client.orders.push(newOrder._id);
      await client.save();
    }

 

    return newOrder;
  } catch (error) {
    console.error("❌ Error al crear la orden:", error.message);
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
