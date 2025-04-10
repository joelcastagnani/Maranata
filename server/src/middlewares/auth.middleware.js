import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("🛡️ Ejecutando middleware verifyToken..."); // <---- NUEVO LOG
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("⛔ Token no proporcionado");
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    console.log("🔐 JWT_SECRET cargado:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("🧪 Usuario decodificado:", decoded);
    next();
  } catch (error) {
    console.log("⛔ Error al verificar token:", error.message);
    res.status(401).json({ message: "Token inválido" });
  }
};
