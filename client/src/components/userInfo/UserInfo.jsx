import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(JSON.parse(atob(token.split(".")[1])));

  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const username = decoded?.username || "Invitado";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="user-info-box">
      <p className="user-name">👤 {username}</p>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserInfo;
