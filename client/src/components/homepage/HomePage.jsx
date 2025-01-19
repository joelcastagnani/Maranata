import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <Link to="/formulario">
        <button className="homePageButton">Crear nuevo pedido</button>
      </Link>
      {/* <Link to="/productos">
        <button className="homePageButton">Ver productos / precios</button>
      </Link>
      <Link to="/pedidos">
        <button className="homePageButton">Ver pedidos</button>
      </Link> */}
    </div>
  );
};

export default HomePage;
