const fs = require("fs")
const path = require("path")
const { validationResult } = require('express-validator');
const {getJson, setJson} = require('../utility/jsonMethod')
const bcrypt = require('bcryptjs');
const usersPath = path.join(__dirname, "../database/users.json");
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);

const usersController = {
    login: (req, res) => {
            res.render('users/login');
        
    },
    userLogin: (req, res) => {  
        const users = getJson('users')
   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('users/login', { errors: errors.array() });
        }

        const { email, password, remember } = req.body;
        const userLogged = users.find(user => user.email === email);
        if (userLogged && bcrypt.compareSync(password, userLogged.password)) {    
        if (remember) {
            res.cookie('remember', 'true', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
        }
        req.session.user = {
            email: userLogged.email,
            first_name: userLogged.first_name,
            last_name: userLogged.last_name,
            admin: userLogged.admin
        }
        res.locals.user = req.session.user;
     
        console.log(req.session.user)
        console.log('Usuario autenticado:', userLogged);
        res.redirect('/');}
    },
    register: (req, res) => {
        const json = fs.readFileSync(usersPath, "utf-8");
        const users = JSON.parse(json);
        res.render("users/register")
    },
    logout: (req,res)=>{
        res.clearCookie('remember')
        req.session.destroy();
        return res.redirect('/')
    },
    userRegister: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
        const users = getJson('users')
            const {first_name, last_name, email, password, adress } = req.body;
        const id = Date.now();
        const newUser = {
            id,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password, 10),
            adress: adress.trim(),
            admin: false,
            image: req.file ? req.file.filename : "default.jpg",
        };
        users.push(newUser);
        setJson(users, 'users')
        res.redirect('/');}
        
        else{

            res.render('users/register', { errors:errors.mapped(), old:req.body});
    }
}
}
module.exports = usersController;