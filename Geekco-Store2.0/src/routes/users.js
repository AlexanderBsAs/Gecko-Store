const express = require('express');
const router = express.Router();
const {login,userLogin,register,userRegister} = require("../controllers/usersController")
const {loginValidationRules,validation} = require("../validations/loginValidator")
/* GET users listing. */
router.get('/login',login );
router.post('/login',loginValidationRules(), userLogin );

router.get('/registro',register );
router.post('/registro',userRegister );


module.exports = router;
