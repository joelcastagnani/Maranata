import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Importar el componente principal
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const Main = () => {
  const navigate = useNavigate(); // Hook de react-router-dom para la navegación

  // Funciones para redirigir al hacer clic en los botones
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Bienvenido.</h1>
      <div>
        <button onClick={handleLoginClick}>Ingresar</button>
        <button onClick={handleRegisterClick}>Registrarse</button>
      </div>
    </div>
  );
};

export default Main;
