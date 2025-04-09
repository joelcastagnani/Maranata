import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Dashboard from "./components/dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import UserInfo from "./components/userInfo/UserInfo.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />

      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Dashboard />} />

        {/* Rutas protegidas */}
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <div className="appContainer">
                <UserInfo />
                <Title />
                <Navbar />
                <HomePage />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderform"
          element={
            <ProtectedRoute>
              <div className="appContainer">
                <UserInfo />
                <Title />
                <Navbar />
                <OrderForm />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div className="appContainer">
                <UserInfo />
                <Title />
                <Navbar />
                <OrdersList />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/productForm"
          element={
            <ProtectedRoute>
              <div className="appContainer">
                <UserInfo />
                <Title />
                <Navbar />
                <ProductForm />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/productsList"
          element={
            <ProtectedRoute>
              <div className="appContainer">
                <UserInfo />
                <Title />
                <Navbar />
                <ProductsList />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
