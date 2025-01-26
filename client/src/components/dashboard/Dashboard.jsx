import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleForm = (form) => {
    if (form === "login") {
      setIsLoginActive(true);
    } else {
      setIsLoginActive(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {email,password});
      localStorage.setItem("token", response.data.token);
      navigate("/"); 
    } catch (error) {
      setError("Credenciales incorrectas o error de conexión");
  }};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacemos la solicitud POST al backend
      const response = await axios.post("/api/auth/register", formData);
      if (response.status === 201) {
        alert("Usuario registrado con éxito.");
        setIsLoginActive(true);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <div className="backgroundContainer">
      <div className="formContainer">
        <h1 className="title playwrite-vn-title">Maranata</h1>

        <div className="options">
          <button
            onClick={() => toggleForm("login")}
            className={`optionsButton dm-sans-mainFont ${
              isLoginActive ? "active" : ""
            }`}
          >
            INGRESAR
          </button>
          <button
            onClick={() => toggleForm("register")}
            className={`optionsButton dm-sans-mainFont ${
              !isLoginActive ? "active" : ""
            }`}
          >
            REGISTRARSE
          </button>
        </div>

        {/* Formulario Login */}
        {isLoginActive && (
          <form onSubmit={handleLogin} className="form loginForm showForm">
            <div className="inputsForm">
              <input
                className="input"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="input"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input className="submitLogin" type="submit" value="Ingresar" />
          </form>
        )}

        {/* Formulario Registrarse */}
        {!isLoginActive && (
          <form
            onSubmit={handleSubmit}
            className="form registrateForm showForm"
          >
            <div className="inputsForm">
              <input
                className="input"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Nombre de usuario: "
              />
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email: "
              />
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Contraseña: "
              />
            </div>
            <input
              className="submitRegister"
              type="submit"
              value="Registrarse"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
