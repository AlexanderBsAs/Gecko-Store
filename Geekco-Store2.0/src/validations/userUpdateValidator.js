const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../database/models")

const userUpdateValidator = () => {
  return [
    body("first_name")
      .notEmpty()
      .withMessage("Introducir nombre")
      .bail()
      .isLength({ min: 3, max: 10 })
      .withMessage("El nombre debe tener entre 3 y 10 caracteres")
      .bail(),
    body("last_name")
      .notEmpty()
      .withMessage("Introducir apellido")
      .bail()
      .isLength({ min: 3, max: 10 })
      .withMessage("Debe tener entre 3 y 10 caracteres")
      .bail(),
      body("birthday")
      .notEmpty()
      .withMessage("Introducir fecha de nacimiento")
      .bail()
  ];
};

const userUpdatePasswordValidator = () => {
  return [
    body("passwordActual")
      .notEmpty()
      .withMessage("Introducir contraseña actual")
      .bail()
      .isLength({ min: 5, max: 20 })
      .withMessage("La contraseña actual debe tener entre 5 y 20 caracteres")
      .bail()
      .custom((value, { req }) => {
        const { id } = req.params;
        return db.User.findByPk(id)
          .then(function(usuario){
            if (!bcrypt.compareSync(value, usuario.password)) {
              throw new Error("Contraseña incorrecta");
            }
          });
      }),
    body("password")
      .notEmpty()
      .withMessage("Introducir contraseña")
      .bail()
      .isLength({ min: 5, max: 20 })
      .withMessage("Debe tener entre 3 y 10 caracteres")
      .bail(),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Introducir confirmación de contraseña")
      .bail()
      .isLength({ min: 5, max: 20 })
      .withMessage("Debe tener entre 5 y 20 caracteres")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true;
      }),
  ];
};

const addressUpdateValidator = () => {
  return [
    body("country")
      .notEmpty()
      .withMessage("Este campo no puede estar vacío")
      .bail()
      .isLength({ min: 3, max: 45 })
      .withMessage("El nombre debe tener entre 3 y 45 caracteres")
      .bail(),
    body("province")
      .notEmpty()
      .withMessage("Este campo no puede estar vacío")
      .bail()
      .isLength({ min: 3, max: 45 })
      .withMessage("Debe tener entre 3 y 45 caracteres")
      .bail(),
      body("city")
      .notEmpty()
      .withMessage("Este campo no puede estar vacío")
      .bail()
      .isLength({ min: 3, max: 45 })
      .withMessage("Debe tener entre 3 y 45 caracteres")
      .bail(),
      body("address")
      .notEmpty()
      .withMessage("Este campo no puede estar vacío")
      .bail()
      .isLength({ min: 3, max: 45 })
      .withMessage("Debe tener entre 3 y 45 caracteres")
      .bail(),
  ];
};

module.exports = {
  userUpdateValidator,
  userUpdatePasswordValidator,
  addressUpdateValidator
};
