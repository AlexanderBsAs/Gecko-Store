const userAuthMiddleware = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    } else {
        next(); // Pasar al siguiente middleware o controlador si el usuario está autenticado
    }
};

module.exports = userAuthMiddleware;