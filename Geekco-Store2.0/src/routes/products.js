const express = require("express");
const router = express.Router();
const {carrito,productDetail,productForm,create,dashboard,edit,productsList,update, destroy} = require("../controllers/productsController")
const userAuthMiddleware = require('../Middlewares/userAuthMiddleware')
const adminAuthMiddleware = require('../Middlewares/adminAuthMIddleware')
const fileUpload = require("../Middlewares/productMulter")

router.get("/carrito",userAuthMiddleware, carrito);
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)
router.get("/productForm",userAuthMiddleware,adminAuthMiddleware,productForm)
router.post("/create", fileUpload.single("image"), create);
router.get("/dashboard",userAuthMiddleware ,adminAuthMiddleware, dashboard);
router.get("/formUpdate/:id",userAuthMiddleware,adminAuthMiddleware, edit);
router.put("/formUpdate/:id",fileUpload.single("image"), update)
router.get("/productsList",userAuthMiddleware, productsList)
router.delete('/delete/:id', destroy)
// router.put('/update', update);

module.exports = router;
