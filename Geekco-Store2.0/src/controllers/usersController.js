const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models/index');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const fs = require('fs');
const moment = require('moment');

const usersController = {
  login: (req, res) => {
    res.render('users/login');
  },
  userLogin: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
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
      console.log(req.session); 
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
        if (req.file) {
          fs.unlinkSync(req.file.path);
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
        rol_id: 1,
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
    const { id } = req.params;
  
    Promise.all([
      db.User.findByPk(
        id,
        {
          include: ["rols","addresses"],
        }
      ),
      db.Address.findOne(
        { where: { user_id: id } }
      )
    ]).then(function([user, address]) {
      user.dataValues.birthday = moment(user.dataValues.birthday).format('YYYY-MM-DD');
      console.log(user.dataValues.birthday);
  
      res.render("users/userUpdate", { usuario: user, address, id });
    }).catch(err => {
      console.error("Error:", err);
      res.status(500).send("Error interno del servidor");
    });
  },
  
  userUpdate: (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, birthday } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        db.User.findByPk(id).then(function(user) {
            res.render("users/userUpdate", { errores: errors.mapped(), old: req.body, usuario: user, id });
        });
    } else {
        const file = req.file;
        console.log("Imagen usuario:",req.file);

        db.User.findByPk(id).then(function(user) {
            let oldImage = user.image;

            if (file) {
                // Si se ha subido un nuevo archivo, eliminar el archivo anterior
                if (oldImage !== "default.webp") {
                    // Verificar si la imagen no es la predeterminada para evitar su eliminación accidental
                    const imagePath = `public/images/users/${oldImage}`;
                    fs.unlinkSync(imagePath);
                }
            }

            db.User.update(
                {
                    first_name,
                    last_name,
                    birthday,
                    image: file ? file.filename : oldImage ? oldImage : "default.webp",
                },
                { where: { id } }
            ).then(function() {
                req.session.user = {
                    first_name,
                    last_name,
                    image: file ? file.filename : "default.webp",
                    id,
                };
                res.locals.user = req.session.user;
                res.redirect(`/users/update/${id}`);
            });
        });
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
    res.render("users/addressUpdate",{usuario:user,address, id})
  })
  },
  updateAddress:(req,res)=>{
    const {id} = req.params
    const {country, province, city,address}= req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
