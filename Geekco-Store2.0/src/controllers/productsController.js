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
      const files = req.files;
if (!files || !files.length){
    return res.status(400).send('Por favor seleccione un archivo');
  }else{
        const {name,price,stock,description,principalDescription,image,
        plataform,franchise,limit,weight,large,category} = req.body;
        console.log(req.body);
        let newId = Date.now()
        const product = {
          id: newId,
          name: name.trim(),
          price: parseFloat(price),
          stock: parseInt(stock),
          description: description.trim(),
          principalDescription: principalDescription.trim(),
          image: files.map(file => file.filename),
          plataform: plataform.trim(),
          franchise: franchise.trim(),
          limit: parseInt(limit),
          weight: weight.trim(),
          large: large.trim(),
          category: category.trim()
        }
      
        products.push(product);
        const productjson = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname,"../database/products.json"),productjson,"utf-8");
        res.redirect("/productos/dashboard")}
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
