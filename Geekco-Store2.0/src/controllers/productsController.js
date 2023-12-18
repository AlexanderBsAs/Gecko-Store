const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(
  path.join(__dirname, "../database/products.json"),
  "utf-8"
);
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
    },
    create: (req,res)=>{
        const product = req.body;
        console.log(product);
        product.id = products[products.length-1].id +1;
        products.push(product);
        const productjson = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname,"../database/products.json"),productjson,"utf-8");
        res.redirect("/")
    },
  dashboard: (req, res) => {
    res.render("products/dashboard", { title: "dashboard", products });
  },
    formUpdate: (req,res)=>{
      const id = req.params.idProducto
      const producto = products.find(element => element.id == id);
      res.render("products/formUpdate",{producto,products})

},
//     update: (req, res) => {
//       res.render("products/update");
// }
}

module.exports = productsController;
