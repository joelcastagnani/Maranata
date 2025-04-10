import { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: {
        type: Number,
        required: true,
        set: (value) => parseFloat(value.toFixed(2)),
      },
    },
    { _id: false }
  );
  
  export default orderItemSchema;