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
   
var fileUpload = multer({ storage: storage })
module.exports = fileUpload