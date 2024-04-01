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


module.exports= multer({ storage: storage });
