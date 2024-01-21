const {body}=require("express-validator")


let validacionRegistro=[
  body("name").notEmpty().withMessage("*Debes poner un nombre"),
  body("lastname").notEmpty().withMessage("* Debes poner un APELLIDO"),
  body("email").notEmpty().withMessage("*Debes especificar un email"),
  body("password").notEmpty().withMessage("*Debes especificar una contraseña"),
 /*  body("confirm-password").notEmpty().withMessage("*Debes elegir una categoria"), */
  body("adress").notEmpty().withMessage("*Debes poner una direccion"),
]

module.exports=validacionRegistro