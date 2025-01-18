import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <button className="homePageButton">Crear nuevo pedido</button>
      <button className="homePageButton">Ver productos / precios</button>
      <button className="homePageButton">Ver pedidos</button>
    </div>
  );
};

export default HomePage;

