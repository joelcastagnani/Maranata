import mongoose from "mongoose";
import { getCurrentShift } from "../../utils/getCurrentShift.js";

const collection = "ShiftReport";
const currentShift = getCurrentShift();

const shiftReportSchema = new mongoose.Schema(
  {
    initiatedBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["abierto", "cerrado"],
      default: "abierto",
    },
    currentShift: {
      type: String,
      enum: ["mediodia", "noche", "test"],
      required: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    closedBy: {
      type: String,
      default: null,
    },
    closedAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

const ShiftReport = mongoose.model(collection, shiftReportSchema);

export default ShiftReport;
