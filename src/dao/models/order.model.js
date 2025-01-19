import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    name: { type: String, index: true, required: true },
    address: { type: String, required: true },
    order: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);

const Order = model(collection, schema);

export default Order;
