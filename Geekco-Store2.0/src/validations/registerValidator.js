const {body}=require("express-validator")

let validacionRegistro=[
    body("first_name")
    .notEmpty().withMessage("*Debes poner un nombre").bail()
    .isLength({min:5, max:15}).withMessage("Debe ser entre 5 y 15 caracteres"),
    body("last_name").notEmpty().withMessage("* Debes poner un APELLIDO").bail()
    .isLength({min:2, max:25}).withMessage("Debe ser entre 2 y 25 caracteres"),
    body("email").notEmpty().withMessage("*Debes especificar un email").bail()
    .isEmail().withMessage("debes escribir un mail valido"),
    body("password").notEmpty().withMessage("*Debes especificar una contraseña").bail(),
   /*  body("confirm-password").notEmpty().withMessage("*Debes elegir una categoria").bail(), */
    body("adress").notEmpty().withMessage("*Debes poner una direccion").bail(),
  ]
module.exports={validacionRegistro}