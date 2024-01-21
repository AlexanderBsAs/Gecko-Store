const express = require('express');
const router = express.Router();
const {body}=require("express-validator")
const {login,userLogin,register,userRegister} = require("../controllers/usersController")
const {loginValidationRules,validation} = require("../validations/loginValidator")
/* const {validacionRegistro} = require("../validations/registerValidator") */
let validacionRegistro=[
    body("first_name").notEmpty().withMessage("*Debes poner un nombre").bail(),
    body("last_name").notEmpty().withMessage("* Debes poner un APELLIDO").bail(),
    body("email").notEmpty().withMessage("*Debes especificar un email").bail(),
    body("password").notEmpty().withMessage("*Debes especificar una contraseña").bail(),
   /*  body("confirm-password").notEmpty().withMessage("*Debes elegir una categoria").bail(), */
    body("adress").notEmpty().withMessage("*Debes poner una direccion").bail(),
  ]
/* GET users listing. */
router.get('/login',login );
router.post('/login',loginValidationRules(), userLogin );

router.get('/registro',register );
router.post('/registro',validacionRegistro,userRegister );


module.exports = router;
