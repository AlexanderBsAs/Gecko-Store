import "../styles/stylesheets/style.css"
import  {useState,useEffect } from "react";
import ProductWrapper from "./ProductWrapper";
import CategoryWrapper from "./CategoryWrapper";
import UserWrapper from "./UserWrapper";
import LatestProduct from "./LatestProduct";
import LatestUser from "./LatestUser";
// import PopularCategory from "./PopularCategory";
const ContentWrapper = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [latestProduct, setLatestProduct] = useState(null);
    // const [mostPopularCategory, setMostPopularCategory] = useState(null);
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/products');
          if (!response.ok) {
            throw new Error('Error al obtener los productos');
          }
          const data = await response.json();
          setProducts(data.data); // Guardar el array de productos en el estado
          // Obtener el último producto del array de productos
          const latest = data.data.length > 0 ? data.data[data.data.length - 1] : null;
          setLatestProduct(latest); // Establecer el último producto en el estado
          console.log(latest.image)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
        
      
        const fetchUsers = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/users');
            if (!response.ok) {
              throw new Error('Error al obtener los usuarios');
            }
            const data = await response.json();
            setUsers(data.data); // Guarda solo el array de usuarios en el estado
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
      
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/categories');
            if (!response.ok) {
              throw new Error('Error al obtener las categorías');
            }
            const responseData = await response.json();
            const categoriesData = responseData.data; // Extraer el array de categorías
      
            setCategories(categoriesData);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };

        // const fetchMostPopularCategory = async () => {
        //   try {
        //     const response = await fetch('http://localhost:3000/api/categories/PopularCategory');
        //     if (!response.ok) {
        //       throw new Error('Error al obtener la categoría más popular');
        //     }
        //     const data = await response.json();
        //     setMostPopularCategory(data.mostPopularCategory);
            
        //   } catch (error) {
        //     console.error('Error fetching most popular category:', error);
        //   }
        // };
    
      
        // fetchMostPopularCategory();
        fetchProducts();
        fetchUsers();
        fetchCategories();
      }, []);
     
        
      
      
    return (
        <div className="ContentWrapper">
        <div className="top-home">
        <ProductWrapper totalProducts={products.length} />
        <CategoryWrapper totalCategorys={categories.length || 0} />
        <UserWrapper totalUsers={users.length}/>
        </div>
        <div className="bottom-home">
        {latestProduct && <LatestProduct latestProduct={latestProduct} />}
        <LatestUser users={users}/>
        </div>
        {/* <PopularCategory mostPopularCategory={mostPopularCategory}/> */}
      </div>

    )
}

export default ContentWrapper;