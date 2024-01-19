const express = require('express');
const router = express.Router();
const {login,userLogin,register,userRegister} = require("../controllers/usersController")
const {loginValidationRules,validation} = require("../validations/loginValidator")
const guestMiddleware = require('../Middlewares/guestMiddleware')
const userAuthMiddleware = require('../Middlewares/userAuthMiddleware')
/* GET users listing. */
router.get('/login',guestMiddleware,login );
router.post('/login',loginValidationRules(), userLogin );

router.get('/registro',guestMiddleware,register );
router.post('/registro',userRegister );


module.exports = router;
