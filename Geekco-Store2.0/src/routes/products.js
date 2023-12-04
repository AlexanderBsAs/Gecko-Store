const express = require('express');
const router = express.Router();
const {carrito,detalles,productDetail} = require("../controllers/productsController")

router.get('/carrito',carrito );
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)


module.exports = router;
