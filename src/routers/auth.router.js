import express from "express";
import User from "../dao/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificamos si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Creamos el nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Hubo un error al registrar el usuario." });
  }
});
router.post('/login', login);

export default router;
