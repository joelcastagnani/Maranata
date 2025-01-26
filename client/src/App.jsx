import React from "react";
import {
  BrowserRouter,
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
import Main from "./main.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />

      <Routes>
        <Route path="/" element={<Dashboard />}/>
      </Routes>

    </BrowserRouter>
  );
};

export default App;



// <Router>

// <ToastContainer position="top-right" autoClose={1000} />

// <Routes>
//   <Route path="/" element={<Dashboard />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/register" element={<Register />} />
//   <Route path="/homepage" element={<HomePage />} />

//   <Route
//     path="/orderForm"
//     element={
//       <>
//         <Navbar />
//         <OrderForm />
//       </>
//     }
//   />
//   <Route
//     path="/orders"
//     element={
//       <>
//         <Navbar />
//         <OrdersList />
//       </>
//     }
//   />
//   <Route
//     path="/productForm"
//     element={
//       <>
//         <Navbar />
//         <ProductForm />
//       </>
//     }
//   />
//   <Route
//     path="/products"
//     element={
//       <>
//         <Navbar />
//         <ProductsList />
//       </>
//     }
//   />
// </Routes>

// </Router>