import { Schema, model } from "mongoose";

const collection = "client";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Client = model(collection, clientSchema);

export default Client;
