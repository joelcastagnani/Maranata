import Order from "../dao/models/order.model.js";
import Client from "../dao/models/client.model.js";
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
    const userId = req.user?.userId || null;

    // 🕐 Detectar el turno actual
    const currentShift = getCurrentShift();
    if (!currentShift) {
      return res.status(400).json({
        message: "No es un horario válido para registrar una orden.",
      });
    }

    // 📅 Limitar búsqueda al día actual
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // 🔍 Buscar si ya existe un shift abierto para hoy y este turno
    let existingShift = await ShiftSummary.findOne({
      shift: currentShift,
      createdAt: { $gte: startOfDay },
      status: "abierto",
    });

    // 🆕 Si no existe, crear uno automáticamente
    if (!existingShift) {
      existingShift = await ShiftSummary.create({
        date: new Date(), // solo fecha
        shift: currentShift,
        totalRevenue: 0,
        usersInShift: userId ? [userId] : [],
        status: "abierto",
        openedAt: new Date(),
      });

    } else {
      // ⚠️ Verificamos si el usuario ya está en el shift
      if (userId && !existingShift.usersInShift.includes(userId)) {
        existingShift.usersInShift.push(userId);
        await existingShift.save();
      }
    }

    // 🧾 Crear la orden
    const newOrder = await create({ ...data, user: userId });

    return res.status(201).json({
      message: "Orden creada correctamente ✅",
      response: newOrder,
    });
  } catch (error) {
    console.error("❌ Error en createOrder:", error.message);
    return res.status(500).json({
      message: "Error al crear la orden",
      error: error.message,
    });
  }
};


// const createOrder = async (req, res) => {
//   try {
//     const data = req.body;
//     const userId = req.user?.userId || null;

//     // 🕐 Detectar el turno actual
//     const currentShift = getCurrentShift();
//     if (!currentShift) {
//       return res.status(400).json({
//         message: "No es un horario válido para registrar una orden.",
//       });
//     }

//     // 📅 Limitar búsqueda al día actual
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);

//     // 🔍 Buscar si ya existe un shift abierto para hoy y este turno
//     const existingShift = await ShiftSummary.findOne({
//       shift: currentShift,
//       createdAt: { $gte: startOfDay },
//       status: "abierto",
//     });

//     // 🆕 Si no existe, crear uno automáticamente
//     if (!existingShift) {
//       await ShiftSummary.create({
//         date: new Date(),                // 🔹 fecha del turno
//         shift: currentShift,
//         totalRevenue: 0,                 // 🔹 arranca en cero
//         usersInShift: userId ? [userId] : [], // 🔹 registrar primer usuario si hay
//         status: "abierto",
//         openedAt: new Date(),
//       });
//     }

//     // 🧾 Crear la orden
//     const newOrder = await create({ ...data, user: userId });

//     return res.status(201).json({
//       message: "Orden creada correctamente ✅",
//       response: newOrder,
//     });
//   } catch (error) {
//     console.error("❌ Error en createOrder:", error.message);
//     return res.status(500).json({
//       message: "Error al crear la orden",
//       error: error.message,
//     });
//   }
// };

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
