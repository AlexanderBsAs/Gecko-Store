const express = require("express");
const router = express.Router();
const {carrito,productDetail,productForm,create,dashboard, update, edit} = require("../controllers/productsController")

router.get("/carrito", carrito);
// router.get('/detalles',detalles );
router.get('/detalles/:idProducto', productDetail)
router.get("/productForm",productForm)
router.post("/create",create)
router.get("/dashboard", dashboard);
router.get("/formUpdate/:id",edit);
router.put("/formUpdate/:id", update)
// router.put('/update', update);

module.exports = router;
