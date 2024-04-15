import React from 'react';
import "../styles/stylesheets/style.css"
const SideBar = () => {  
    return(  
        <nav className='SideBar__nav'>
            <img src="./images/logo.png" alt="Logo" className="logo-image" />
         <ul>
             <li><a href='http://localhost:5173/products'>Productos</a></li>
             <li><a href='http://localhost:5173/users'>Usuarios</a></li>
             <li><a href='http://localhost:5173/categories'>Categorias</a></li>    
             <li>Estadísticas</li>     
             <li>Dashboard</li>          
        </ul>
        </nav>
        )
};

export default SideBar;