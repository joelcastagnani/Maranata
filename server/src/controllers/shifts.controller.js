import ShiftReport from "../dao/models/shiftReport.model.js";
import Order from "../dao/models/order.model.js";

export const closeShift = async (req, res) => {
  try {
    const shiftId = req.params.id;
    const user = req.user?.username || "Usuario desconocido";

    const shift = await ShiftReport.findById(shiftId);
    if (!shift || shift.status === "cerrado") {
      return res
        .status(400)
        .json({ message: "Turno ya cerrado o no encontrado" });
    }

    const orders = await Order.find({ shiftReport: shiftId });
    const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    shift.status = "cerrado";
    shift.endedAt = new Date();
    shift.closedBy = user;
    shift.totalSales = total;
    shift.totalOrders = orders.length;
    shift.closedAt = new Date();
    await shift.save();

    res.status(200).json({ message: "Turno cerrado con éxito", shift });
  } catch (err) {
    console.error("Error al cerrar turno:", err);
    res.status(500).json({ message: "Error interno" });
  }
};
export const getOpenShift = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const currentShift = await ShiftReport.findOne({
      status: "abierto",
      createdAt: { $gte: startOfToday },
    });

    if (!currentShift) {
      return res.status(404).json({
        message: "No hay turnos abiertos actualmente.",
        response: null,
      });
    }

    res.status(200).json({
      message: "Turno abierto encontrado.",
      response: currentShift,
    });
  } catch (error) {
    console.error("❌ Error al obtener el turno abierto:", error.message);
    res.status(500).json({
      message: "Error al obtener el turno abierto",
      error: error.message,
    });
  }
};