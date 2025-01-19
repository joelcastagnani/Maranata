import Order from "../dao/models/order.model.js";

const create = async (data) => {
  try {
    console.log("Datos recibidos para crear el pedido:", data);//aca llega bien
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
    { page, sort: { name: 1 }, select: "-createdAt -updatedAt -__v" }
  );
  return all;
};


export { create, read };
