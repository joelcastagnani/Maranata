import React, { useState } from "react";
import "./ProductForm.css";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    image: "",
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
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Producto creado exitosamente: " + JSON.stringify(data));
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          subcategory: "",
          image: "",
        });
      } else {
        const error = await response.json();
        alert("Error al crear el producto: " + error.message);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: " + error.message);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="inputsContainer">
        <div className="input">
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            className="inputBar"
            type="text"
            id="name"
            name="name"
            placeholder="Nombre del producto"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="description">Descripción:</label>
          <textarea
            className="inputBar"
            id="description"
            name="description"
            placeholder="Descripción del producto"
            rows="4"
            value={formData.description || ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="input">
          <label htmlFor="price">Precio:</label>
          <input
            className="inputBar"
            type="text"
            id="price"
            name="price"
            placeholder="Precio"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="category">Categoría:</label>
          <input
            className="inputBar"
            type="text"
            id="category"
            name="category"
            placeholder="Categoría"
            value={formData.category || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="subcategory">Subcategoría:</label>
          <input
            className="inputBar"
            type="text"
            id="subcategory"
            name="subcategory"
            placeholder="Subcategoría"
            value={formData.subcategory || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="image">Imagen (URL):</label>
          <input
            className="inputBar"
            type="text"
            id="image"
            name="image"
            placeholder="URL de la imagen"
            value={formData.image || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button className="submit" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default ProductForm;
