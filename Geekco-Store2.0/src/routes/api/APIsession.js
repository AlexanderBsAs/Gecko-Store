const express = require("express");
const router = express.Router();

// Middleware para verificar la autenticación del usuario
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  next();
});

// Ruta para obtener la información del usuario autenticado
router.get('/user-info', (req, res) => {
  try {
    const userData = {
      email: req.session.user.email,
      firstName: req.session.user.first_name,
      lastName: req.session.user.last_name,
      image: req.session.user.image,
      isAdmin: req.session.user.admin,
      id: req.session.user.id
      // Agrega más propiedades según necesites
    };
    res.json(userData);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;