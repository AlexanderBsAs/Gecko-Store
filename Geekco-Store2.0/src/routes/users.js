const express = require('express');
const router = express.Router();
const {login,userLogin,register,userRegister} = require("../controllers/usersController")
const loginValidationRules = require("../validations/loginValidator")
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
  
  let upload = multer({ storage: storage })
/* const {validacionRegistro} = require("../validations/registerValidator") */
/* GET users listing. */
router.get('/login',login );
router.post('/login',loginValidationRules, userLogin );

router.get('/registro',register );
router.post('/registro',upload.single("image"),validacionRegistro,userRegister );


module.exports = router;
