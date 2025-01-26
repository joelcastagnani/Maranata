import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token)
    return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar info del usuario al request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
