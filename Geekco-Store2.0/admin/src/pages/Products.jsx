import  { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import UpBar from '../components/UpBar';
import SideBar from '../components/SideBar';

import "../styles/stylesheets/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [productId, setProductId] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data.data);

        // Establecer el productId inicial solo si aún no se ha inicializado
        if (!initialized && data.data.length > 0) {
          setProductId(data.data[0].id);
          setInitialized(true);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del producto");
        }
        const data = await response.json();
        setProductDetail(data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId !== null) {
      fetchProductDetail();
    }
    fetchProducts();
  }, [productId, initialized]);

  const handleProductClick = (id) => {
    setProductId(id);
  };

  return (
    <div className="body-products">
    <div className="contenedor">
    <UpBar />
    <SideBar />
      <div className="contenedor-products">
        <ProductDetail productDetail={productDetail} />
        <div className="contenedor-lista">
          <ProductList
            products={products}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Products;
