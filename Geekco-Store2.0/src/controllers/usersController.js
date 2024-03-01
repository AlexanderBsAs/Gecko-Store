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
   userLogin : async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.render('users/login', { errors: errors.array() });
        }
    
        const { email, remember } = req.body;
        // Buscar el usuario por su correo electrónico en la base de datos
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
          throw new Error('Correo electrónico no encontrado');
        }
    
        // Si se recuerda al usuario, establecer una cookie
        if (remember) {
          res.cookie('remember', email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
        }
    
        // Establecer la sesión del usuario
        req.session.user = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          admin: (user.rol_id === 2) ,
          id: user.id
        };
        res.locals.user = req.session.user;
    
        console.log('Usuario autenticado:', user.email,user.rol_id);
        res.redirect('/');
      } catch (error) {
        console.error('Error al autenticar al usuario:', error.message);
        res.status(500).send('Error al autenticar al usuario');
      }
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
    
  },
  destroy: (req,res)=>{
    const userId = req.params.id
    db.User.destroy({
      where: userId
    })
    .then((resp)=>{
      return res.redirect("/users/dashboard")
    })
  }
}

module.exports = usersController;
