const fs = require("fs")
const path = require("path")
const { validationResult } = require('express-validator');
const {getJson, setJson} = require('../utility/jsonMethod')
const bcrypt = require('bcryptjs');
const usersPath = path.join(__dirname, "../database/users.json");
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);
const db = require('../database/models/index');
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
            const {first_name, last_name, email, password, address, birthday } = req.body;
        const id = Date.now();
        const newUser = {
            id,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password, 10),
            address: address.trim(),
            birthday: birthday,
            admin: false,
            image: req.file ? req.file.filename : "default.jpg",
        };
        users.push(newUser);
        setJson(users, 'users')
        res.redirect('/');}
        
        else{
        console.log(errors);
        if (req.file) {
            fs.unlinkSync(req.file.path); // Eliminar el archivo
        }
        res.render('users/register', { errors: errors.mapped(), old: req.body });
    }
},
userUpdateForm: (req, res) => {
  const {id} = req.params
  
  Promise.all([db.User.findByPk(
    id,
    {
      include: ["rols","addresses"],
    }
    ),
    db.Address.findOne(
      {where:{user_id : id}}
  )]).then(function([user,address]){
    res.render("users/userUpdate",{usuario:user,address, id})
  })
  },
  userUpdate: (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, birthday, image} = req.body;
    const file = req.file;
      if (!file) {
        throw new Error("Debe elegir una imagen");
      }
    db.User.update(
      {
        first_name,
        last_name, 
        birthday, 
        image : file ? file.filename : "default.webp",
      },
      {where: {id}}
    ).then(function(){
      res.redirect("/");
    })
  },

  updatePasswordForm: (req, res) => {
    const { id } = req.params;
    db.User.findByPk(id)
    .then(function(resultado){
      res.render("users/passwordUpdate", { usuario: resultado, id })
    })
  },

  updatePassword: (req, res) => {
    const {id} = req.params;
    const {password} = req.body;
    db.User.update(
      {
        password: bcrypt.hashSync(password, 10)
      },
      {where: {id}}
    ).then(function(user){
      res.send(user)
    })
  },
  updateAddressForm:(req,res)=>{
    const {id} = req.params
    Promise.all([
      db.User.findByPk(id),
      db.Address.findOne(
        {where:{user_id : id}}
    )]).then(function([user,address]){
      console.log(address)
    res.render("users/addressUpdate",{usuario:user,address, id})
  })
  },
  updateAddress:(req,res)=>{
    const {id} = req.params
    const {country, province, city,address}= req.body
    db.Address.update(
      {
        country, province, city, address
      },
      {
        where:{user_id:id}
      }
      )
    }
}
module.exports = usersController;
