import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order",
    default: [],
  }],
});

const Client = model("Client", clientSchema);

export default Client;