import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";

import Navbar from "./components/navbar/Navbar.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import OrderForm from "./components/orderForm/OrderForm.jsx";
import Title from "./components/titulo/Title.jsx";
import OrdersList from "./components/ordersList/OrdersList.jsx";
import ProductForm from "./components/productForm/Productform.jsx";

const App = () => {
  return (
    <Router>
      <Title />
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/pedidos" element={<OrdersList />} />
        <Route path="/productForm" element={<ProductForm />} />
      </Routes>
    </Router>
  );
};




export default App;