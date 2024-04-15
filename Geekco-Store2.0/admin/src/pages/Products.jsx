import React, {useState,useEffect } from "react";
import ProductList from "../components/ProductList"
import UpBar from "../components/UpBar";
import SideBar from "../components/SideBar";

 const Products = () => {
    
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);


  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/products');
          if (!response.ok) {
            throw new Error('Error al obtener los productos');
          }
          const data = await response.json();
          setProducts(data.data); // Guardar el array de productos en el estado
          // // Obtener el último producto del array de productos
          // const latest = data.data.length > 0 ? data.data[data.data.length - 1] : null;
          // setLatestProduct(latest); // Establecer el último producto en el estado
          // console.log(latest.image)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const fetchProductDetail = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/products/1');
          if (!response.ok) {
            throw new Error('Error al obtener los productos');
          }
          const data = await response.json();
          setProductDetail(data.data); // Guardar el array de productos en el estado
          // // Obtener el último producto del array de productos
          // const latest = data.data.length > 0 ? data.data[data.data.length - 1] : null;
          // setLatestProduct(latest); // Establecer el último producto en el estado
          // console.log(latest.image)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts()
      fetchProductDetail()
  },[])
    return (
      <div>
            {/* <a href='http://localhost:5173/'>Home</a> */}
           
      <h1>
      Dashboard Productos
      </h1>
      
<div style={{ display: 'flex' }}>
      <div>

      <h1>
        {productDetail.name}
      </h1>
      <img src={productDetail.imageUrl}></img>
            <p>
        {productDetail.description}
      </p>
      </div>
      <div>
        <ProductList products={products}/>
      </div>
      </div>
      </div>
      )
    
  }

  export default Products