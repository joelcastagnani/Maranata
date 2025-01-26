import express from "express";
import User from "../dao/models/user.model.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

const router = express.Router();

// Ruta para registrar un nuevo usuario
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
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // Payload
      process.env.JWT_SECRET || "mysecret", // Clave secreta para firmar el token
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Enviar el token como respuesta
    res.status(200).json({ message: "Login exitoso", token });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Hubo un error al iniciar sesión." });
  }
});

export default router;