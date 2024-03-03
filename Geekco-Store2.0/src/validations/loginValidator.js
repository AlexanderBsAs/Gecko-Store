const { body } = require('express-validator');
const bcrypt = require("bcryptjs")
const path = require("path")
const db = require("../database/models/index")

const loginValidationRules = [
  body('email')
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isEmail().withMessage('El valor ingresado debe tener el formato de un correo electrónico')
    .custom(async (value) => {
      // Busca un usuario por su correo electrónico en la base de datos
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('El correo electrónico no está registrado');
      }
    }),

  body('password')
    .notEmpty().withMessage('El campo no puede estar vacío')
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      // Verifica si la contraseña es correcta utilizando bcrypt
      if (!bcrypt.compareSync(value, user.password)) {
        throw new Error('La contraseña ingresada no es correcta');
      }
    })
];


module.exports =  loginValidationRules;