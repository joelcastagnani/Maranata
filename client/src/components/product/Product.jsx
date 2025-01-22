import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "./Product.css";
import axiosConfig from "../../utils/axiosConfig.js";

Modal.setAppElement("#root");

const Product = ({
  id,
  name,
  description,
  price,
  category,
  subcategory,
  image,
  onProductUpdate,
  onProductDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    description,
    price,
    category,
    subcategory,
    image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDelete = async () => {
    try {
      await axiosConfig.delete(`/api/products/${id}`);
      onProductDelete(id);
      toast.success("Producto eliminado con éxito.");
    } catch (error) {
      console.error("Error eliminando el Producto:", error);
      toast.error(
        `Error eliminando el producto: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(`/api/products/${id}`, formData);
      onProductUpdate(response.data);
      setIsModalOpen(false);
      toast.success("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error actualizando el producto:", error);
      toast.error(
        `Error actualizando el producto: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  return (
    <div className="productContainer">
      <div className="information">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <p>{category}</p>
        <p>{subcategory}</p>
        <p>{image}</p>
      </div>
      <div className="options">
        <button onClick={() => setIsModalOpen(true)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>

      {/* Modal para editar el producto */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar producto"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Editar producto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Descripcion: </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Precio: </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Categoria: </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Subcategoria: </label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="button" onClick={handleEdit}>
              Guardar cambios
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Product;
