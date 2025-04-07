import React, { useEffect, useState } from "react";
import "./Popup.css";

function Popup({ isOpen, onClose, orderItems, setOrderItems }) {
  const [products, setProducts] = useState({ response: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch("http://localhost:8080/api/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleAddProduct = (product) => {
    setOrderItems((prevOrder) => {
      const existingItem = prevOrder.find(
        (item) => item.productId === product._id
      );
      if (existingItem) {
        return prevOrder.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevOrder,
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            description: product.description,
          },
        ];
      }
    });
  };

  const filteredProducts = products.response.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modalPopup">
      <div className="modalPopup-content">
        <span className="closePopup" onClick={onClose}>
          &times;
        </span>

        <ul className="productPopup-list">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="listContainer">
            {loading ? (
              <p>Cargando productos...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product._id} className="product-item">
                  <h3>{product.name}</h3>
                  <p>Precio: ${product.price}</p>
                  <button
                    className="addButton"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProduct(product);
                    }}
                  >
                    Agregar
                  </button>
                </li>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </ul>

        <div className="sumaryContainerPopup">
          {orderItems.length > 0 && (
            <div className="orderPopup-summary">
              <h3>Productos en el pedido:</h3>
              <ul>
                {orderItems.map((item) => {
                  const product = products.response.find(
                    (p) => p._id === item.productId
                  );
                  return (
                    <li key={item.productId}>
                      {product?.name || "Producto desconocido"} -{" "}
                      {item.quantity} unidad(es) - $
                      {(product?.price
                        ? product.price * item.quantity
                        : 0
                      ).toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <button className="readyButton" onClick={onClose}>
            Pedido listo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
