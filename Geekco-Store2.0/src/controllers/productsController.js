const productsController = {
    carrito: (req,res)=>{
        res.render("products/productCart")
    },
    detalles: (req,res)=>{
        res.render("products/productDetail")
    }
}

module.exports = productsController;