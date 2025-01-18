import React, { useState } from "react";
import './Formulario.css';

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    pedido: "",
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
      const response = await fetch("http://localhost:5000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Pedido creado exitosamente: " + JSON.stringify(data));
        setFormData({ nombre: "", direccion: "", telefono: "", pedido: "" }); // Limpiar formulario
      } else {
        const error = await response.json();
        alert("Error al crear el pedido: " + error.message);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          placeholder="Tu dirección"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="Tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="pedido">Pedido:</label>
        <textarea
          id="pedido"
          name="pedido"
          placeholder="Detalles del pedido"
          rows="4"
          value={formData.pedido}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
