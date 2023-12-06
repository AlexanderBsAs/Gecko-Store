const express = require('express');
const router = express.Router();
const {carrito,detalles,productDetail,productForm,create} = require("../controllers/productsController")

router.get('/carrito',carrito );
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)
router.get("/productForm",productForm)
router.post("/create",create)
module.exports = router;
