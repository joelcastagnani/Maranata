import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import Formulario from "./components/formulario/Formulario.jsx";

import "./App.css";
import Title from "./components/titulo/Title.jsx";

const App = () => {
  return (
    <Router>
      <Title />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crearpedido" element={<Formulario />} />
      </Routes> */
}
