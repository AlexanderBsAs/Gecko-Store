const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models/index');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const usersController = {
  login: (req, res) => {
    res.render('users/login');

  },
  userLogin: async (req, res) => {
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

      // Si se recuerda al usuario, restablecer la cookie
      if (remember) {
        res.cookie('remember', email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
      }

      // Establecer la sesión del usuario
      req.session.user = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        image: user.image,
        admin: (user.rol_id === 2),
        id: user.id
      };
      res.locals.user = req.session.user;

      console.log('Usuario autenticado:', user.email, user.rol_id);
      res.redirect('/');
    } catch (error) {
      console.log(err);
    }
  },
  register: (req, res) => {
    res.render("users/register")
    },
    logout: (req,res)=>{
        res.clearCookie('remember')
        req.session.destroy();
        return res.redirect('/')
    },
    userRegister: (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          console.log(errors);
          if (req.file) {
              fs.unlinkSync(req.file.path); // Eliminar el archivo
          }
          return res.render('users/register', { errors: errors.mapped(), old: req.body });
      }
  
      const { first_name, last_name, email, password, address, birthday } = req.body;
      db.User.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        address,
        birthday,
        admin: false,
        image: req.file ? req.file.filename : "default.jpg",
    })
    
      .then(newUser => {
          console.log('Usuario creado:', newUser.email);
          res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
    });
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
    const {first_name, last_name, birthday} = req.body;
    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          db.User.findByPk(id).then(function(user){
            res.render("users/userUpdate",{errores: errors.mapped(), old: req.body, usuario:user, id})
          })
        }else {
    const file = req.file
    db.User.update(
      {
        first_name,
        last_name, 
        birthday, 
        image : file ? file.filename : "default.webp",
      },
      {where: {id}}
    ).then(function(){
      req.session.user = {
        first_name,
        last_name,
        image : file ? file.filename : "default.webp",
        id
      };
      res.locals.user = req.session.user;
      res.redirect("/");
    })
  }
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
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors)
          db.User.findByPk(id).then(function(user){
            res.render("users/passwordUpdate",{errores: errors.mapped(), old: req.body, usuario:user, id})
          })
        }else {
    db.User.update(
      {
        password: bcrypt.hashSync(password, 10)
      },
      {where: {id}}
    ).then(function(){
      res.redirect("/")
    })}
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errores",errors)
      Promise.all([
        db.User.findByPk(id),
        db.Address.findOne(
          {where:{user_id : id}}
      )]).then(function([user,address]){
        res.render("users/addressUpdate",{errores: errors.mapped(), old: req.body, usuario:user,address, id})
      })
    }else {
    db.Address.update(
      {
        country, province, city, address
      },
      {
        where:{user_id:id}
      }
      )
    .then(function(){
      res.redirect("/")
    })
  }
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
