import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePageContainer roboto-general">
      <section className="optionsColumn">
        <Link to="/orderForm">
          <button className="homePageButton">Crear nuevo pedido</button>
        </Link>
        <Link to="/pedidos">
          <button className="homePageButton">Ver pedidos</button>
        </Link>
      </section>

      <section className="optionsColumn">
        <Link to="/productForm">
          <button className="homePageButton">Crear nuevo producto</button>
        </Link>
        <Link to="/products">
          <button className="homePageButton">Ver productos</button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
