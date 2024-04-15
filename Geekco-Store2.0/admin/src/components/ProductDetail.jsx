import React from "react";

const ProductDetail = ({ productDetail }) => {
  return (
    <div className="card-detail">
      {productDetail && (
        <>
          <h1>{productDetail.name}</h1>
          <div style={{ display: "flex" }}>
            <div className="contenedor-imagen">
              <img src={productDetail.imageUrl} alt={productDetail.name} />
            </div>
            <div className="contenedor-detalle">
              <p className="lista-tabla">Precio: {productDetail.price}</p>
              <p className="lista-tabla">
                Descuento: {productDetail.discount ? productDetail.discount : ""}
              </p>
              <p className="lista-tabla">
                Categoría: {productDetail.categories.name ? productDetail.categories.name : ""}
              </p>
              <p className="lista-tabla">
                Plataforma: {productDetail.platforms ? productDetail.platforms.name : ""}
              </p>
              <p className="lista-tabla">
                Marca: {productDetail.brands.name ? productDetail.brands.name : ""}
              </p>
            </div>
          </div>
          <p>{productDetail.description}</p>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
