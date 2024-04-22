import { useEffect, useState } from "react";
import UpBar from '../components/UpBar';
import SideBar from '../components/SideBar';
import "../styles/stylesheets/category.css";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories/count");
        if (!response.ok) {
          throw new Error("Error al obtener los categorias");
        }
        const data = await response.json();
        setCategories(data.data);

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


    return (
      <div className='body-categorias'>
      <div className='main-categorias'>
        <UpBar />
        <SideBar />
        <div className='contenedor-dashboard-categorias'>
        <h1>Dashboard de Categorías</h1>
        <div className='contenedor-categorias'>
      <div>

      <div className="caja-categorias">
        {
          categories.map((categorie,index )=> (
            <div className="caja-categoria" key={index}>
            <h1>{categorie.name}</h1>
            <div>{categorie.count}</div>
            <h3>productos</h3>
            </div>
          ))
        }
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>)
    
  }
  
  export default Categories; 