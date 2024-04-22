import { useState } from "react";
import PropTypes from 'prop-types';


const ProductList = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 11;

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
      <div 
      className={`pagination-button-left ${currentPage === 1 ? 'hidden' : ''}`}
      onClick={goToPreviousPage} disabled={currentPage === 1}>
      <img src="/images/arrow.png"></img>
        </div>
        <div className="contenedor-tabla">
        <a href={`http://localhost:3000/productos/productForm`} className="agregar-producto">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 13h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m-1 18H4V4h16Z"/></svg>
        </a>
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
        <div
          className={`pagination-button-right ${currentPage === Math.ceil(products.length / productsPerPage) ? 'hidden' : ''}`}
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
      <img src="/images/arrow.png"></img>
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onProductClick: PropTypes.func.isRequired,
};

export default ProductList;
