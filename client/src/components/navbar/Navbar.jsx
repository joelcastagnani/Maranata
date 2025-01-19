import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">INICIO</Link>
        </li>
        <li className="navbar-item">
          <Link to="/nose1" className="navbar-link">NOSE1</Link>
        </li>
        <li className="navbar-item">
          <Link to="/nose2" className="navbar-link">NOSE2</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
