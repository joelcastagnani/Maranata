import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Order.css";

const Order = ({ id, name, address, phone, order, onOrderUpdate, onOrderDelete }) => {

  const handleDelete = async () => {
    console.log("ID para eliminar:", id);  // Verifica que el id es correcto
    try {
      await axios.delete(`/api/orders/${id}`);
      onOrderDelete(id); // Llama a la función para actualizar la lista en el cliente
    } catch (error) {
      console.error("Error eliminando la orden:", error);
      toast.error(`Error eliminando la orden: ${error.response?.data?.error || error.message}`);
    }
  };
  const handleEdit = async () => {
    const updatedData = prompt("Ingrese los nuevos datos del pedido (en JSON):");
    try {
      const response = await axios.put(`/api/orders/${id}`, JSON.parse(updatedData));
      onOrderUpdate(response.data); // Llama a la función para actualizar la orden en el cliente
    } catch (error) {
      console.error("Error actualizando la orden:", error);
    }
  };

  return (
    <div className="orderContainer">
      <div className="information">
        <h2>{address}</h2>
        <p>Nombre: {name}</p>
        <p>Teléfono: {phone}</p>
        <p>Pedido: {order}</p>
      </div>
      <div className="options">
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default Order;
