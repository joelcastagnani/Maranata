import mongoose from "mongoose";
import { getCurrentShift } from "../../utils/getCurrentShift.js";

const collection = "ShiftReport";
const currentShift = getCurrentShift();

const shiftReportSchema = new mongoose.Schema(
  {
    initiatedBy: {
      type: String, // El nombre de la persona que inició el turno
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["abierto", "cerrado"],
      default: "abierto",
    },
    currentShift: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShiftReport = mongoose.model(collection, shiftReportSchema);

export default ShiftReport;
