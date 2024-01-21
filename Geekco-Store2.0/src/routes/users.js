const express = require('express');
const router = express.Router();
const {body}=require("express-validator")
const {login,userLogin,register,userRegister} = require("../controllers/usersController")
const {loginValidationRules,validation} = require("../validations/loginValidator")
const {validacionRegistro} = require("../validations/registerValidator")
const multer=require("multer")
const path=require("path")

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       let destino=path.join(__dirname,"../../public/images/users/")
       return cb(null,destino)
    },
    filename:(req,file,cb)=>{
        let newfile=/* file.fieldname */"image"+"-"+Date.now()+path.extname(file.originalname)
        return cb(null,newfile)
    }
  })
  
  let upload=multer({storage:storage})
/* const {validacionRegistro} = require("../validations/registerValidator") */
/* GET users listing. */
router.get('/login',guestMiddleware,login );
router.post('/login',loginValidationRules(), userLogin );

router.get('/registro',register );
router.post('/registro',upload.single(),validacionRegistro,userRegister );


module.exports = router;
