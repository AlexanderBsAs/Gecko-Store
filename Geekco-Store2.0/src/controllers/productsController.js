
const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/products.json"),"utf-8")
const products = JSON.parse(json);


const productsController = {
    carrito: (req,res)=>{
        res.render("products/productCart")
    },
    productDetail: (req,res)=>{
        const id = req.params.idProducto
        const producto = products.find(element => element.id == id);
        res.render("products/productDetail",{producto,products})
    },
    productForm: (req,res)=>{
        res.render("products/productForm")
    }
}

module.exports = productsController;

