import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePageContainer roboto-general">
      <div className="homePageOptionsColumn">
        <Link to="/orderForm">
          <button className="homePageButton">Crear nuevo pedido</button>
        </Link>
        <Link to="/pedidos">
          <button className="homePageButton">Ver pedidos</button>
        </Link>
      </div>

      <div className="homePageOptionsColumn">
        <Link to="/productForm">
          <button className="homePageButton">Crear nuevo producto</button>
        </Link>
        <Link to="/products">
          <button className="homePageButton">Ver productos</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
