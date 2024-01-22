const {body}=require("express-validator")
const path=require("path")
const fs=require("fs")
const usersPath = path.join(__dirname, "../database/users.json");
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);

let validacionRegistro=[
    body("first_name")
    .notEmpty().withMessage("*Debes poner un nombre").bail()
    .isLength({min:5, max:15}).withMessage("Debe ser entre 5 y 15 caracteres"),
    body("last_name").notEmpty().withMessage("* Debes poner un APELLIDO").bail()
    .isLength({min:2, max:25}).withMessage("Debe ser entre 2 y 25 caracteres"),
    body("email").notEmpty().withMessage("*Debes especificar un email").bail()
    .custom((value,{req})=>{
        let adress=users.find((elemento)=>{
            return elemento.email==req.body.email
        })
        if(adress){
            throw new Error("ese email ya existe")
        }
        else {
        return true
    }
    })
    .isEmail().withMessage("debes escribir un mail valido"),
    body("password").notEmpty().withMessage("*Debes especificar una contraseña").bail(),
    body("adress").notEmpty().withMessage("*Debes poner una direccion").bail()
    .custom((value,{req})=>{
        let adress=users.find((elemento)=>{
            return elemento.adress==req.body.adress
        })
        if(adress){
            throw new Error("esa direccion ya existe")
        }
        else {
        return true
    }
    }),
    body("confirm-password")
   /*  .custom((value,{req})=>{
        if(req.body.password==req.body.confirm-password){
            return true
        }
        else{
            throw new Error("las contraseñas no coinciden")
        }
    }) */
    .custom((value,{req}) => {
        //Verifica que la contraseña sea idéntica a la confirmación de contraseña
        return value == req.body.password
    }).withMessage('Las contraseñas no coinciden'),
    body("imagen")
    .custom((value,{req})=>{
       let extensiones=[".jpg",".jpeg",".png",".gif"]
      if(req.file){
        let extensionFile=path.extname(req.file.originalname)
        if(extensiones.includes(extensionFile)){
            return true
        }
        else{
            throw new Error("Las extensiones permitidas son: "+extensiones.join(", "))
        }

      }
      else{
        throw new Error("debes cargar una imagen")
      }
/*        if(req.file)
       { let extensionFile=path.extname(req.file.originalname)
       let extension=extensiones.find(elemento=>{
        elemento==extensionFile
       })
        if(extension){
            return true
          
        }
        else {  
            throw new Error("las extensiones de archivos validas son: "+extensiones.join(", "))
    }}
    else{
        throw new Error("Debes poner una imagen")
    } */
    }),
    
  ]
module.exports={validacionRegistro}