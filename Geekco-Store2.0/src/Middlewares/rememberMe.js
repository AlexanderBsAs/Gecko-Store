const cookieParser = require('cookie-parser');
const fs = require("fs")
const path = require("path")

const rememberMiddleware = (req, res, next) => {
    if (req.cookies.remember && !req.session.user) {
        const json = fs.readFileSync(path.join(__dirname, "../database/users.json"),"utf-8");
        const users = JSON.parse(json);
        const savedEmail = req.cookies.remember; 

        const userLogged = users.find(user => user.email === savedEmail);

        if (userLogged) {
            
            req.session.user = {
                email: userLogged.email,
                first_name: userLogged.first_name,
                last_name: userLogged.last_name
                
            };

            res.locals.user = req.session.user;
        }
    }

    next();
};

module.exports = rememberMiddleware;