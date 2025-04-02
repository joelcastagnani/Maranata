import React, { useEffect, useState } from "react";
import Order from "../order/Order.jsx";
import "./OrdersList.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders?page=${page}`
        );
        const data = await response.json();
        setOrders(data.response.docs);
        setTotalPages(data.response.totalPages);
      } catch (err) {
        console.error("Error al obtener pedidos:", err);
        setError("No se pudieron cargar los pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]); // Refrescar cuando cambie la página

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ordersListContainer">
      <h1 className="listTitle">Lista de Pedidos</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <Order
            key={order._id}
            id={order._id}
            name={order.name}
            address={order.address}
            phone={order.phone}
            order={order.order}
            onOrderUpdate={(updatedOrder) =>
              setOrders((prevOrders) =>
                prevOrders.map((o) =>
                  o._id === updatedOrder._id ? updatedOrder : o
                )
              )}
            onOrderDelete={(deletedId) =>
              setOrders((prevOrders) =>
                prevOrders.filter((o) => o._id !== deletedId)
              )}
          />
        ))
      ) : (
        <p>No hay pedidos disponibles.</p>
      )}

      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={page === 1} // Deshabilitar si estamos en la primera página
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages} // Deshabilitar si estamos en la última página
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
