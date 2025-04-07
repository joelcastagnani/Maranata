import React from "react";
import "./TicketModal.css";

function TicketModal({ isOpen, onClose, orderData }) {
  if (!isOpen || !orderData) return null;

  const { name, address, phone, order } = orderData;
  const totalPrice = order
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="modalTicket">
      <div className="modalTicket-content">
        <div className="ticket-details">
          <p>
            <strong className="adress">{address}</strong>
          </p>
          <p>{name}</p>
          <p>{phone}</p>
        </div>

        <table className="orderTicket-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Unidades</th>
              <th>Precio Unidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${(item?.price ?? 0).toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="totalTicket">Total: ${totalPrice}</h3>

        <button className="closeButtonTicket" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default TicketModal;
