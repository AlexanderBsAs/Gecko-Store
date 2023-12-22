const express = require("express");
const router = express.Router();
const {carrito,productDetail,productForm,create,dashboard,edit,productsList} = require("../controllers/productsController")
const path = require("path")
const multer = require('multer')

//**Disk Storage**//
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
//__________________________________________________//

router.get("/carrito", carrito);
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)
router.get("/productForm",productForm)
router.post("/create", fileUpload.array("image"), create)
router.get("/dashboard", dashboard);
router.get("/formUpdate/:id", edit);
router.get("/productsList", productsList)
// router.put('/update', update);

module.exports = router;
