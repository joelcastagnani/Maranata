import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar/Navbar.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import OrderForm from "./components/orderForm/OrderForm.jsx";
import Title from "./components/title/Title.jsx";
import OrdersList from "./components/ordersList/OrdersList.jsx";
import ProductForm from "./components/productForm/Productform.jsx";
import ProductsList from "./components/productsList/ProductsList.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Main from "./main.jsx";

const App = () => {
  return (
    <Router>
      <Title />
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />

        <Route
          path="/orderForm"
          element={
            <>
              <Navbar />
              <OrderForm />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <OrdersList />
            </>
          }
        />
        <Route
          path="/productForm"
          element={
            <>
              <Navbar />
              <ProductForm />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <ProductsList />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
