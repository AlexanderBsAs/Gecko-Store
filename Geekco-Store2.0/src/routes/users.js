const express = require('express');
const router = express.Router();
const {login,userLogin,register,userRegister,logout} = require("../controllers/usersController")
const {loginValidationRules,validation} = require("../validations/loginValidator")
const guestMiddleware = require('../Middlewares/guestMiddleware')
const userAuthMiddleware = require('../Middlewares/userAuthMiddleware')
const {validacionRegistro} = require("../validations/registerValidator")
const multer = require("multer");
const path=require("path")

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       let destino=path.join(__dirname,"../../public/images/users")
       cb(null,destino)
    },
    filename:(req,file,cb)=>{
      let uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  let upload = multer({storage: storage });
/* GET users listing. */
router.get('/login',guestMiddleware,login );
router.post('/login',loginValidationRules(), userLogin );

router.get('/registro',guestMiddleware,register );
router.post('/registro',upload.single('image'),validacionRegistro,userRegister );

// Ruta de logout del usuario

router.get('/logout', logout)


module.exports = router;
