import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "order";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { 
      type: Number, 
      required: true,
      set: (value) => parseFloat(value.toFixed(2))
    },
  },
  { _id: false }
);

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
      set: (value) => parseFloat(value.toFixed(2))
    }, 
  },
  { timestamps: true }
);


schema.plugin(mongoosePaginate);

const Order = model(collection, schema);

export default Order;