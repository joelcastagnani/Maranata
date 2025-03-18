import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    name: { type: String, index: true, required: true },
    description: { type: String },
    stock: { type: Number, default: 1 },
    price: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
