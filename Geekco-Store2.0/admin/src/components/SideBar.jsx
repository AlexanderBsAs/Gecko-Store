import React from 'react';
import "../styles/stylesheets/style.css"
const SideBar = () => {  
    return(  
        <nav className='SideBar__nav'>
            <img src="./images/logo.png" alt="Logo" className="logo-image" />
         <ul>
             <li>Productos</li>
             <li>Categorias</li>     
             <li>Estadísticas</li>     
             <li>Dashboard</li>          
        </ul>
        </nav>
        )
};

export default SideBar;