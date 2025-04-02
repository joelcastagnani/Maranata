import React, { useEffect, useState } from "react";
import "./OrdersModal.css";

function OrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

  const fetchOrders = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/orders?page=${pageNumber}`
      );
      const data = await response.json();

      if (data.response && Array.isArray(data.response.docs)) {
        setOrders((prevOrders) => [...prevOrders, ...data.response.docs]);
        setTotalPages(data.response.totalPages);
      } else {
        console.error("La API no devolvió un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setOrders([]);
      setPage(1);
      fetchOrders(1);
    }
  }, [isOpen]);
  const loadMoreOrders = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage);
    }
  };
  const formatDate = (isoDate) => {
    if (!isoDate) return "Fecha no disponible";
    const date = new Date(isoDate);
    return isNaN(date.getTime())
      ? "Fecha inválida"
      : date.toLocaleDateString("es-ES");
  };
  const formatTime = (isoDate) => {
    if (!isoDate) return "Hora no disponible";
    const date = new Date(isoDate);
    return isNaN(date.getTime())
      ? "Hora inválida"
      : date.toLocaleTimeString("es-ES");
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  if (!isOpen) return null;

  return (
    <div className="modalOrders">
      <div className="modalOrders-content">
        <span className="closeOrders" onClick={onClose}>
          &times;
        </span>
        <h2>Lista de Pedidos</h2>

        {orders.length === 0 ? (
          <p>No hay pedidos disponibles</p>
        ) : (
          <>
            <div className="ordersTableContainer">
              <table className="ordersTable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      Fecha
                      <button onClick={toggleSortOrder} className="sortButton">
                        ({sortOrder === "asc" ? "⬆️" : "⬇️"})
                      </button>
                    </th>
                    <th>Horario</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.phone}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {page < totalPages && (
              <button
                className="loadMoreButton"
                onClick={loadMoreOrders}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Cargar más"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersModal;
