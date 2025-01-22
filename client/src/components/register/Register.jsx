import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otras rutas
import axios from "axios"; // Asegúrate de tener Axios instalado
import "./Register.css"; // Estilos personalizados para el registro

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook para redirigir

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div className="registerContainer">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
        <button className="registerButton" type="submit">
          Registrarse
        </button>
      </form>
      {error && <p className="error">{error}</p>}{" "}
      {/* Mostrar errores si existen */}
      <div className="redirectContainer">
        <p>¿Ya tienes una cuenta?</p>
        <button
          className="loginRedirectButton"
          onClick={() => navigate("/login")} // Redirige a la página de login
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Register;
