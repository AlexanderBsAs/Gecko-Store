import React, { useState } from "react";

const ProductList = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calcular el índice del primer y último producto en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="contenedor-dashboard">
    <h1>Dashboard Productos</h1>

      <div className="body-tabla">
      <button className="pagination-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
      &lt;&lt;
        </button>
        <div className="contenedor-tabla">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="lista-tabla"
              onClick={() => onProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
                  <div>{product.name}</div>
            </div>
          ))}
        </div>
        <button
        className="pagination-button"
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
          &gt;&gt;
        </button>
      </div>
     
        
    </div>
  );
};

export default ProductList;
