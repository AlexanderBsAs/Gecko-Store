const adminAuthMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        next(); // Pasar al siguiente middleware o controlador si el usuario es un administrador
    } else {
        res.redirect('/'); // Redirigir a donde corresponda si el usuario no es un administrador
    }
};

module.exports = adminAuthMiddleware;
