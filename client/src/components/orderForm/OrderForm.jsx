import React, { useState } from "react";
import "./OrderForm.css";

function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Pedido creado exitosamente: " + JSON.stringify(data));
        setFormData({ nombre: "", direccion: "", telefono: "", pedido: "" });
      } else {
        const error = await response.json();
        alert("Error al crear el pedido: " + error.message);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: " + error.message);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="inputsContainer">
        <div className="input">
          <label htmlFor="name">Nombre:</label>
          <input
            className="inputBar"
            type="text"
            id="name"
            name="name"
            placeholder="Pedido a nombre de:"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="address">Dirección:</label>
          <input
            className="inputBar"
            type="text"
            id="address"
            name="address"
            placeholder="Dirección"
            value={formData.address || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="phone">Teléfono:</label>
          <input
            className="inputBar"
            type="text"
            id="phone"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="order">Pedido:</label>
          <textarea
            className="inputBar"
            id="order"
            name="order"
            placeholder="Detalles del pedido"
            rows="4"
            value={formData.order || ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>

      <button className="submit" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default OrderForm;
