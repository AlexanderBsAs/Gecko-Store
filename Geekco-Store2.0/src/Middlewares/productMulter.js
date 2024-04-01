const path = require("path")
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dataBase = path.join(__dirname, "../../public/images/products");
      cb(null, dataBase)
    },
    filename:  (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
  
  })
  const fileFilter = (req,file,cb)=>{
    const filtro =   /\.(jpg|jpeg|png|gif)$/
    if(filtro.test(file.originalname)){
     // To accept this file pass `false`, like so:
     cb(null, true)
    }else{    
     // To reject the file pass `true`, like so:
     req.errorValidationImage = "No es un tipo de archivo valido"
     cb(null, false)
    }
 }
   
 const Fileupload = multer({ storage: storage, fileFilter: fileFilter });

 module.exports = Fileupload;