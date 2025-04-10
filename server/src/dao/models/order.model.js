import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import orderItemSchema from "../schemas/orderItemSchema.js";

const collection = "order";

const schema = new Schema(
  {
    name: { type: String, index: true, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    order: { type: [orderItemSchema], default: [] },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      set: (value) => parseFloat(value.toFixed(2)),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shiftReport: {
      type: Schema.Types.ObjectId,
      ref: "ShiftReport",
      required: true,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Order = model(collection, schema);

export default Order;
