import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">
        INICIO
      </Link>

      <Link to="/nose1" className="navbar-link">
        -------
      </Link>

      <Link to="/nose2" className="navbar-link">
      -------
      </Link>
    </nav>
  );
};

export default Navbar;
