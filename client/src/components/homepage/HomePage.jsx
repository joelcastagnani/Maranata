import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrdersModal from "../ordersModal/OrdersModal"; // Importa el modal
import "./HomePage.css";

const HomePage = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const navigate = useNavigate();

  const cerrarTurno = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No hay token. Iniciá sesión nuevamente.");
        return;
      }

      // 1. Obtener el turno abierto actual
      const res = await fetch("http://localhost:8080/api/shifts/abierto", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data || !data.response || !data.response._id) {
        alert("No se encontró un turno abierto.");
        return;
      }

      const shiftId = data.response._id;

      // 2. Cerrar el turno
      const closeRes = await fetch(
        `http://localhost:8080/api/shifts/${shiftId}/close`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const closeData = await closeRes.json();

      if (closeRes.ok) {
        alert("✅ Turno cerrado correctamente.");
      } else {
        alert("❌ Error al cerrar el turno: " + closeData.message);
      }
    } catch (error) {
      console.error("❌ Error al cerrar turno:", error.message);
      alert("❌ Ocurrió un error al cerrar el turno.");
    }
  };

  return (
    <div className="homePageContainer roboto-general">
      <div className="homePageOptionsColumn">
        <Link to="/orderForm">
          <button className="homePageButton">Crear nuevo pedido</button>
        </Link>
        <button
          className="homePageButton"
          onClick={() => setIsOrdersOpen(true)}
        >
          Ver pedidos
        </button>
      </div>

      {/* Modal de pedidos */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <button className="homePageCloseShiftButton" onClick={cerrarTurno}>
        Cerrar turno
      </button>
    </div>
  );
};

export default HomePage;
