const express = require("express");
const router = express.Router();
const {
  carrito,
  detalles,
  productDetail,
  dashboard,
} = require("../controllers/productsController");

router.get("/carrito", carrito);
// router.get('/detalles',detalles );
router.get("/detalles/:idProducto", productDetail);
router.get("/dashboard", dashboard);

module.exports = router;
