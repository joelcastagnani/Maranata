import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/homepage" className="navbar-link">
        INICIO
      </Link>

      <Link to="/admin" className="navbar-link">
        ADMIN
      </Link>
    </nav>
  );
};

export default Navbar;
