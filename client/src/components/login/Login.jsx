import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud POST al backend
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // Si la autenticación es exitosa, guardar el token o datos de usuario
      localStorage.setItem("token", response.data.token); // O cualquier otro dato que devuelva el backend

      // Redirigir al usuario a la página principal
      navigate("/"); // O la ruta que desees
    } catch (error) {
      // Si ocurre un error, mostrar el mensaje
      setError("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login" type="submit">
          Ingresar
        </button>
      </form>
      {error && <p className="error">{error}</p>} {/* Mostrar errores */}
    </div>
  );
};

export default Login;
