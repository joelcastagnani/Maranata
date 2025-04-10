import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrdersModal from "../ordersModal/OrdersModal"; // Importa el modal
import "./HomePage.css";

const HomePage = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const navigate = useNavigate();

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


    </div>
  );
};

export default HomePage;
