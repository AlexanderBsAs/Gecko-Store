const fs = require("fs")
const path = require("path")
const { validationResult } = require('express-validator');
const {getJson, setJson} = require('../utility/jsonMethod')
const bcrypt = require('bcryptjs');
const usersPath = path.join(__dirname, "../database/users.json");
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);
const db = require('../models/index');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

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
            res.cookie('remember', req.body.email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
        }
        req.session.user = {
            email: userLogged.email,
            first_name: userLogged.first_name,
            last_name: userLogged.last_name,
            admin: userLogged.admin,
            id: userLogged.id
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
            const {first_name, last_name, email, password, address } = req.body;
        const id = Date.now();
        const newUser = {
            id,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password, 10),
            address: address.trim(),
            admin: false,
            image: req.file ? req.file.filename : "default.jpg",
        };
        users.push(newUser);
        setJson(users, 'users')
        res.redirect('/');}
        
        else{
          console.log(errors);
            res.render('users/register', { errors:errors.mapped(), old:req.body});
    }
},
userUpdateForm: (req, res) => {
    const usuarios = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );
    const users = JSON.parse(usuarios);

    const id = +req.params.id;
    const usuario = users.find((usuario) => usuario.id == id);
    console.log(usuario);
    res.render("users/userUpdate", {
      usuario,
      id,
    });
  },
  userUpdate: (req, res) => {
    try {
      const usuarios = fs.readFileSync(
        path.join(__dirname, "../database/users.json"),
        "utf-8"
      );
      const { first_name, last_name, address } = req.body;
      const { id } = req.params;
      const users = JSON.parse(usuarios);
      const usuario = users.find((usuario) => usuario.id == id);
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        res.render("users/userUpdate", {
          usuario,
          id,
          errores: errores.mapped(),
        });
      } else {
        const userUpdate = {
          id: usuario.id,
          first_name,
          last_name,
          email: usuario.email,
          admin: usuario.admin,
          password: usuario.password,
          address,
          image: usuario.image,
        };
        let usersList = users.map((elemento) => {
          if (elemento.id == id) {
            return userUpdate;
          } else {
            return elemento;
          }
        });
        let jsonUpdate = JSON.stringify(usersList);

        fs.writeFileSync(
          path.join(__dirname, "../database/users.json"),
          jsonUpdate,
          "utf-8"
        );
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },

  updatePasswordForm: (req, res) => {
    const usuarios = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );
    const users = JSON.parse(usuarios);

    const id = +req.params.id;
    const usuario = users.find((usuario) => usuario.id == id);
    console.log(usuario);
    res.render("users/passwordUpdate", { usuario, id });
  },

  updatePassword: (req, res) => {
    try {
      const usuarios = fs.readFileSync(
        path.join(__dirname, "../database/users.json"),
        "utf-8"
      );
      const { password } = req.body;
      const { id } = req.params;
      const users = JSON.parse(usuarios);
      const usuario = users.find((usuario) => usuario.id == id);
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        res.render("users/passwordUpdate", {
          usuario,
          id,
          errores: errores.mapped(),
        });
      } else {
        const userUpdate = {
          id: usuario.id,
          first_name: usuario.first_name,
          last_name: usuario.last_name,
          email: usuario.email,
          admin: usuario.admin,
          password: bcrypt.hashSync(password, 10),
          address: usuario.address,
          image: usuario.image,
        };
        let usersList = users.map((elemento) => {
          if (elemento.id == id) {
            return userUpdate;
          } else {
            return elemento;
          }
        });
        let jsonUpdate = JSON.stringify(usersList);

        fs.writeFileSync(
          path.join(__dirname, "../database/users.json"),
          jsonUpdate,
          "utf-8"
        );
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },
  listUsers:(req,res)=>{
    console.log(db.User)
    db.User.findAll()
    .then(resultado=>{
          res.render("users/listUsers",{users:resultado})
    })
    .catch(error=>{
      res.send(error)
    })

  }
}
module.exports = usersController;
