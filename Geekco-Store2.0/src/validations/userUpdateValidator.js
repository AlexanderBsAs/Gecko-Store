const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

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
    body("adress")
      .notEmpty()
      .withMessage("Introducir domicilio")
      .bail()
      .isLength({ min: 5, max: 20 })
      .withMessage("Debe tener entre 5 y 20 caracteres")
      .bail(),
  ];
};

const userUpdatePasswordValidator = () => {
  return [
    body("passwordActual")
      .notEmpty()
      .withMessage("Introducir contraseña actual")
      .bail()
      .isLength({ min: 3, max: 10 })
      .withMessage("La contraseña actual debe tener entre 3 y 10 caracteres")
      .bail()
      .custom((value, { req }) => {
        const { id } = req.params;
        const usuarios = fs.readFileSync(
          path.join(__dirname, "../database/users.json"),
          "utf-8"
        );
        const users = JSON.parse(usuarios);
        const usuario = users.find((usuario) => usuario.id == id);
        return bcrypt.compareSync(value, usuario.password);
      })
      .withMessage("Contraseña incorrecta")
      .bail(),

    body("password")
      .notEmpty()
      .withMessage("Introducir contraseña")
      .bail()
      .isLength({ min: 3, max: 10 })
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

module.exports = {
  userUpdateValidator,
  userUpdatePasswordValidator,
};
