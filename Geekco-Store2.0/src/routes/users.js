const express = require('express');
const router = express.Router();
const loginValidationRules = require("../validations/loginValidator")
const {login,userLogin,register,userRegister,logout} = require("../controllers/usersController")
const guestMiddleware = require('../Middlewares/guestMiddleware')
const userAuthMiddleware = require('../Middlewares/userAuthMiddleware')
const {validacionRegistro} = require("../validations/registerValidator")
const multer=require("multer")
const path=require("path")
const upload = require('../validations/uploadUser');

/* GET users listing. */
router.get('/login',login );
router.post('/login',loginValidationRules, userLogin );
router.get('/login',guestMiddleware,login );




router.get('/registro',guestMiddleware,register );
router.post('/registro',upload.single('image'),validacionRegistro,userRegister );

// Ruta de logout del usuario

router.get('/logout', logout)


module.exports = router;
