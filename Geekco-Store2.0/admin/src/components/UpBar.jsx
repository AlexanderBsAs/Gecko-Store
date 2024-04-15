import React, { useState, useEffect } from 'react';

const UpBar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchSessionInfo = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/session/user-info', {
            credentials: 'include',
            method:'GET'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch session info');
          }
          const data = await response.json();
          setUserData(data);
          console.log('Session info:', data);
        } catch (error) {
          console.error('Error fetching session info:', error);
        }
      };

    fetchSessionInfo();
  }, []);  // Se ejecuta solo una vez al montar el componente

  if (!userData) {
    return (
      <nav className="UpBar__nav">
      
        <a href="http://localhost:3000/">Volver al inicio</a>
        <span>Cargando...</span> 
        
      </nav>
    );
  }

  const { firstName, image } = userData;  // Extraemos el nombre y la imagen del usuario

  return (
    <nav className="UpBar__nav">
       <a href="http://localhost:3000/">Volver al inicio</a>
      <p>{firstName}</p>
         <div><img src={`http://localhost:3000/images/users/${image}`}/> </div>

    </nav>
  );
};

export default UpBar;