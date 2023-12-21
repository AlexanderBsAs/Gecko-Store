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
    let json = fs.readFileSync(path.join(__dirname, "../database/products.json"), "utf-8");
    const products = JSON.parse(json);
    res.render("products/dashboard", { title: "dashboard", products });
  },
/*     formUpdate: (req,res)=>{
      const id = req.params.id
      const producto = products.find(element => element.id == id);
      res.render("products/formUpdate",{producto,products,id})

}, */
edit: (req, res) => {
  const json = fs.readFileSync(
    path.join(__dirname, "../database/products.json"),
    "utf-8"
  );
  const products = JSON.parse(json);
  const id = +req.params.id
  let productos = products.find((elemento) => {

    return elemento.id == id

  })
  console.log(productos)

  res.render("products/formupdate", { productos, id })

},
update: (req,res)=>{
  const json = fs.readFileSync(
    path.join(__dirname, "../database/products.json"),
    "utf-8"
  );
  const { name, price, stock, discount, platform, category, description, installments}=req.body
  const id= +req.params.id
/*    const files=req.files
  const filename=files.map((elemento)=>{
     elemento.filename
  })  */
const file=req.file
/*  console.log(file) */
  let nuevobjeto={
   id,
   name,
   price: +price,
   discount:+discount,
   stock:+stock,
   description,
   image:file? file.filename:null,
   platform,
   category,
   installments
  }
  console.log(nuevobjeto.image)
  let producto = products.map((elemento) => {
    if (elemento.id == id) {
      /* nuevobjeto.image = elemento.image */

      return nuevobjeto
    }
   
  return elemento
  }) 
/*   console.log(producto) */
/*  console.log(producto) */
/* console.log(producto) */
  let json2=JSON.stringify(producto)
/*     console.log(json2) */
fs.writeFileSync(path.join(__dirname, "../database/products.json"),json2,"utf-8")  
 /* console.log(req.body) */
  res.redirect("/productos/dashboard")
}
//     update: (req, res) => {
//       res.render("products/update");
// }
}

module.exports = productsController;
