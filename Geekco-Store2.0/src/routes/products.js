const express = require("express");
const router = express.Router();
const {carrito,productDetail,productForm,create,dashboard, update, edit} = require("../controllers/productsController")
const multer=require("multer")
const path=require ( "path")


let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      return  cb(null,path.join(__dirname+"../../public/images/products"))
    },
    filename:(req,file,cb)=>{
        let newfile= file.fieldname + "-"+ Date.now()+ path.extname(file.originalname)
      console.log(file)
       return cb(null,newfile)
    }
})
  
let upload= multer({storage:storage})

router.get("/carrito", carrito);
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)
router.get("/productForm",productForm)
router.post("/create",create)
router.get("/dashboard", dashboard);
router.get("/formUpdate/:id",edit);
router.put("/formUpdate/:id", upload.single("image"),update)
// router.put('/update', update);

module.exports = router;
