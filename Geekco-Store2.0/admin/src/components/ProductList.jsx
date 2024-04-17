import { useState } from "react";
import PropTypes from 'prop-types';


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
      <div className="pagination-button-left" onClick={goToPreviousPage} disabled={currentPage === 1}>
      <img src="/images/arrow.png"></img>
        </div>
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
        <div
        className="pagination-button-right"
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
