import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "./Order.css";

// Vincula react-modal al contenedor principal
Modal.setAppElement("#root");

const Order = ({
  id,
  name,
  address,
  phone,
  order,
  onOrderUpdate,
  onOrderDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    address,
    phone,
    order,
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/orders/${id}`);
      onOrderDelete(id); // Llama a la función para actualizar la lista en el cliente
      toast.success("Pedido eliminado con éxito.");
    } catch (error) {
      console.error("Error eliminando la orden:", error);
      toast.error(
        `Error eliminando la orden: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`/api/orders/${id}`, formData);
      onOrderUpdate(response.data); // Llama a la función para actualizar la orden en el cliente
      setIsModalOpen(false); // Cerrar el modal después de la actualización
      toast.success("Pedido actualizado con éxito.");
    } catch (error) {
      console.error("Error actualizando la orden:", error);
      toast.error(
        `Error actualizando la orden: ${
          error.response?.data?.error || error.message
        }`
      );
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
        <button onClick={() => setIsModalOpen(true)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>

      {/* Modal para editar el pedido */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Pedido"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Editar Pedido</h2>
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
            <label>Dirección:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Pedido:</label>
            <input
              type="text"
              name="order"
              value={formData.order}
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

export default Order;

// import React from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./Order.css";

// const Order = ({ id, name, address, phone, order, onOrderUpdate, onOrderDelete }) => {

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/orders/${id}`);
//       onOrderDelete(id);
//     } catch (error) {
//       console.error("Error eliminando la orden:", error);
//       toast.error(`Error eliminando la orden: ${error.response?.data?.error || error.message}`);
//     }
//   };
//   const handleEdit = async () => {
//     const updatedData = prompt("Ingrese los nuevos datos del pedido (en JSON):");
//     try {
//       const response = await axios.put(`/api/orders/${id}`, JSON.parse(updatedData));
//       onOrderUpdate(response.data); // Llama a la función para actualizar la orden en el cliente
//     } catch (error) {
//       console.error("Error actualizando la orden:", error);
//     }
//   };

//   return (
//     <div className="orderContainer">
//       <div className="information">
//         <h2>{address}</h2>
//         <p>Nombre: {name}</p>
//         <p>Teléfono: {phone}</p>
//         <p>Pedido: {order}</p>
//       </div>
//       <div className="options">
//         <button onClick={handleEdit}>Editar</button>
//         <button onClick={handleDelete}>Eliminar</button>
//       </div>
//     </div>
//   );
// };

// export default Order;
