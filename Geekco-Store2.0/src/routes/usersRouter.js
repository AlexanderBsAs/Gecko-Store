const express = require('express');
const router = express.Router();
const {login,userLogin,userRegister,register} = require("../controllers/usersController")


router.get('/login', login);
router.post('/login', userLogin);
router.get('/registro', register);
router.post('/registro', userRegister);

module.exports = router;
