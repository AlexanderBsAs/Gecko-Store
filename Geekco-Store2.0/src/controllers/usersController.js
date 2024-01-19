const fs = require("fs")
const path = require("path")
const { validationResult } = require('express-validator');
const {getJson, setJson} = require('../utility/jsonMethod')
const usersController = {
    login: (req,res)=>{
        if (res.locals.errors) {
            res.render('users/login', { errors: res.locals.errors });
          } else {
            res.render('users/login', { errors: [] });
          }
    },
    userLogin: (req,res)=>{
        const errors = validationResult(req);
         if (!errors.isEmpty()) { console.log(errors);
            res.locals.errors = errors.array();
            return res.render('users/login', { errors: res.locals.errors });
        }
        const users = getJson('users')
        const { email, password, remember } = req.body;
        const userLogged = users.find(user => user.email === email && user.password === password);
        if (remember) {
            res.cookie('remember', 'true', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
        }
        req.session.user = {
            email: userLogged.email,
            first_name: userLogged.first_name,
            last_name: userLogged.last_name
        }
        res.locals.user = req.session.user;
        res.redirect('/');
    },
    register: (req,res)=>{
        res.render("users/register")
    },
    userRegister: (req,res)=>{
        res.redirect("/")
    },
    logout: (req,res)=>{
        res.clearCookie('remember')
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = usersController;