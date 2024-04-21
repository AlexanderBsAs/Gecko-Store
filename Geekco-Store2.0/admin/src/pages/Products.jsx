import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import UpBar from '../components/UpBar';
import SideBar from '../components/SideBar';
import "../styles/stylesheets/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [productId, setProductId] = useState(null);
  const [triggerUpdate, setTriggerUpdate] = useState(false); // Nueva dependencia para forzar la actualización

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
        if (data.data.length > 0 && productId === null) {
          setProductId(data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductDetail = async () => {
      try {
        if (productId !== null) {
          const response = await fetch(`http://localhost:3000/api/products/${productId}`);
          if (!response.ok) {
            throw new Error("Error al obtener los detalles del producto");
          }
          const data = await response.json();
          setProductDetail(data.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProducts();
    fetchProductDetail(); // Llamamos a fetchProductDetail para obtener el detalle del producto inicial
  }, [productId, triggerUpdate]); // Agregamos triggerUpdate como dependencia

  const handleProductClick = (id) => {
    setProductId(id);
  };

  // Función para forzar la actualización de la lista de productos
  const updateProductList = () => {
    // Cambiamos el valor de triggerUpdate para forzar la actualización
    setTriggerUpdate(prevState => !prevState);
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
              updateProductList={updateProductList} // Pasamos la función como prop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
