import UpBar from '../components/UpBar';
import SideBar from '../components/SideBar';
import "../styles/stylesheets/user.css";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";


const Users = () => {

  const [usersWithDetails, setUsersWithDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Calcular el índice del primer y último producto en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersWithDetails.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

   // Cambiar a la página anterior
   const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    const totalPages = Math.ceil(usersWithDetails.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Error al obtener los Usuarios");
        }
        const data = await response.json();
        const users = data.data;
        const usersWithDetailsPromises = users.map(async (user) => {
          const userDetailsResponse = await fetch(`http://localhost:3000/api/users/${user.id}`);
          if (!userDetailsResponse.ok) {
            throw new Error("Error al obtener los detalles del usuario");
          }
          const userDetailsData = await userDetailsResponse.json();
          return { ...user, ...userDetailsData.data };
        });
        const usersWithDetails = await Promise.all(usersWithDetailsPromises);
        setUsersWithDetails(usersWithDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUsers();
  }, []);

  console.log(usersWithDetails)

  const handleDelete = (userId) => {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/users/delete/${userId}?_method=DELETE`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('Error al eliminar el usuario.');
          }
  
          // Si la eliminación es exitosa, mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload(); // Recargar la página después de la eliminación exitosa
          });
        } catch (error) {
          // Si hay algún error durante la eliminación, mostrar un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el usuario',
            text: error.message
          });
        }
      }
    });
  };
  

  return (
    <div className='body-usuarios'>
      <div className='main-usuarios'>
        <UpBar />
        <SideBar />
        <div className='contenedor-usuarios'>
        <div 
        className={`pagination-user-button-left ${currentPage === 1 ? 'hidden' : ''}`}
        onClick={goToPreviousPage} disabled={currentPage === 1} >
        <img src="/images/arrow.png"></img>
        </div>
        <div className='contenedor-lista-usuarios'>
          {currentUsers.map((user) => (
            <div key={user.id} className="user-container">
            <div className='usuarios'>{user.first_name} {user.last_name}</div>
              <img src={user.imageUrl} alt={`${user.first_name} ${user.last_name}`}  />
              <div className='usuarios-buttons'>
              <div className='action-btn'><a href={`http://localhost:3000/users/update/${user.id}`}>EDITAR</a></div>
              <div className='action-btn' onClick={() => handleDelete(user.id)}>ELIMINAR</div>
              </div>
            </div>
          ))}
        </div>
        <div
  className={`pagination-button-right ${currentPage === Math.ceil(usersWithDetails.length / usersPerPage) ? 'hidden' : ''}`}
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(usersWithDetails.length / usersPerPage)
          }
        >
        <img src="/images/arrow.png"></img>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
