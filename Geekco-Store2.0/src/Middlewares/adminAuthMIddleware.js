
const adminAuthMiddleware = (req,res,next) => {
    if (req.session.user && req.session.user.admin == true) {
        next();
    };
    res.redirect("/");
}

module.exports = adminAuthMiddleware;

