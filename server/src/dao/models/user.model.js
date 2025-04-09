import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Definimos el esquema de un usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  }
});

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Sal para encriptar
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);

export default User;
