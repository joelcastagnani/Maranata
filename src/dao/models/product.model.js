import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    name: { type: String, index: true, required: true },
    description: { type: String },
    stock: { type: Number, default: 1 },
    price: { type: Number, default: 1 },
    image: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/512/8787/8787075.png",
    },
    category: {
      type: String,
      enum: ["", "computadoras", "perifericos", "celulares"],
    },
  },
  {
    timestamps: true,
  }
);
schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
