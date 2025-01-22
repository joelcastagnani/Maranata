import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hasheada
    role: { type: String, default: "user" }, 
  },
  {
    timestamps: true, 
  }
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("Users", userSchema);
export default User;
