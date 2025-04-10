import React, { useState } from "react";
import "./OrderForm.css";
import Popup from "../popup/Popup";
import TicketModal from "../ticketModal/Ticketmodal.jsx";

function OrderForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); // Estado para modal de resumen
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      orderItems.length === 0
    ) {
      setMessage(
        "Por favor, completa todos los campos y selecciona al menos un producto."
      );
      console.log("❌ Error: Faltan datos en el formulario.");
      return;
    }

    const orderData = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      order: orderItems,
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la orden");
      }

      setMessage("Orden enviada con éxito 🎉");
      setFormData({ name: "", address: "", phone: "" });
      setOrderItems([]);
    } catch (error) {
      setMessage("Hubo un problema al enviar la orden.");
      console.error(error);
    }
  };

  return (
    <form className="orderFormContainer" onSubmit={handleSubmit}>
      <div className="inputsContainer">
        <div className="orderFormInput">
          <label htmlFor="name">Nombre:</label>
          <input
            className="inputBar"
            type="text"
            id="name"
            name="name"
            placeholder="Pedido a nombre de:"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="orderFormInput">
          <label htmlFor="address">Dirección:</label>
          <input
            className="inputBar"
            type="text"
            id="address"
            name="address"
            placeholder="Dirección"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="orderFormInput">
          <label htmlFor="phone">Teléfono:</label>
          <input
            className="inputBar"
            type="text"
            id="phone"
            name="phone"
            placeholder="Teléfono"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="orderFormInput">
          <label>Pedido:</label>
          {orderItems.length > 0 ? (
            <div className="button-group">
              <button
                className="editButton"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Editar Pedido
              </button>
              <button
                className="editButton"
                type="button"
                onClick={() => setIsTicketOpen(true)}
              >
                Generar ticket
              </button>
            </div>
          ) : (
            <button
              className="inputBarButton"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Seleccionar productos
            </button>
          )}
        </div>
      </div>

      <button className="orderFormSubmit" type="submit">
        Enviar
      </button>

      <Popup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
      />

      <OrderSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        orderItems={orderItems}
      />

      <TicketModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        orderData={{ ...formData, order: orderItems }}
      />
    </form>
  );
}

export default OrderForm;