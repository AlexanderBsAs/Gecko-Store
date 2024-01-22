const { body } = require('express-validator');
const bcrypt = require("bcryptjs")
const fs = require ("fs")
const path = require("path")
const usersPath = path.join(__dirname, "../database/users.json");
const {getJson} = require('../utility/jsonMethod')


const loginValidationRules = [
  body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
  .isEmail().withMessage("El valor ingresado debe tener el formato de un correo electronico").bail()
  .custom(value => {
      let users = getJson('users')      
      const user = users.find(elemento => elemento.email == value);
      return user ? true : false
  }).withMessage("El E-mail ingresado no coincide con ningún usuario registrado"),

  body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
  .custom((value, {req} )=> {
      let users = getJson('users')      
      const user = users.find(elemento => elemento.email == req.body.email)
      return bcrypt.compareSync(value, user.password);
  }).withMessage("La contraseña ingresada no es correcta")
];

module.exports =  loginValidationRules;