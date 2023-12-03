const express = require('express');
const router = express.Router();
const {carrito,detalles} = require("../controllers/productsController")

router.get('/carrito',carrito );
router.get('/detalles',detalles );


module.exports = router;
