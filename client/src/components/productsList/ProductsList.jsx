import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import "./ProductsList.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products?page=${page}`
        );
        const data = await response.json();
        setProducts(data.response.docs);
        setTotalPages(data.response.totalPages);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productsListContainer">
      <h1 className="listTitle">Lista de Productos</h1>

      {products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            subcategory={product.subcategory}
            onProductUpdate={(updatedProduct) =>
              setProducts((prevProducts) =>
                prevProducts.map((o) =>
                  o._id === updatedProduct._id ? updatedProduct : o
                )
              )
            }
            onProductDelete={(deletedId) =>
              setProducts((prevProducts) =>
                prevProducts.filter((o) => o._id !== deletedId)
              )
            }
          />
        ))
      ) : (
        <p>No hay productos disponibles.</p>
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

export default ProductsList;