import React from "react";
import "./OrderSumary.css";

function OrderSummaryModal({ isOpen, onClose, orderItems }) {
  if (!isOpen) return null;

  const total = orderItems
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Resumen del Pedido</h2>

        <ul className="order-summary">
          {orderItems.map((item) => (
            <li key={item.productId}>
              {item.name} - {item.quantity} unidad(es) - $
              { (Number(item.price) * item.quantity).toFixed(2) }
            </li>
          ))}
        </ul>

        <h3 className="total">Total: ${total}</h3>

        <button className="closeButton" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryModal;
