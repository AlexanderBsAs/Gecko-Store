import React from 'react';

const ProductWrapper = ({ totalProducts }) => {
    console.log('Total de productos:', totalProducts);
  return (
    <div className="ProductWrapper">
      <p>Total de productos: {totalProducts}</p>
    
    </div>
    
  );
};

export default ProductWrapper;