const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname, "../database/products.json"),"utf-8");
const products = JSON.parse(json);

const productsController = {

    carrito: (req,res)=>{
        res.render("products/productCart")
    },
    productDetail: (req,res)=>{
      const json = fs.readFileSync(path.join(__dirname, "../database/products.json"), "utf-8");
      const products = JSON.parse(json);
        const id = req.params.idProducto
        const producto = products.find(element => element.id == id);
        res.render("products/productDetail",{producto,products})
    },
    productForm: (req,res)=>{
        res.render("products/productForm")
    },
    create: (req,res,next)=>{
      console.log('Files:', req.file.filename);
      console.log('Body:', req.body);
      const filename = req.file.filename;
      const json = fs.readFileSync(path.join(__dirname, "../database/products.json"), "utf-8");
      const products = JSON.parse(json);
        
      if (!req.file){
     return res.status(400).send('Por favor seleccione un archivo'); 
     
       }else{
        const {name,price,stock,description,image,
        platform,category,installments,discount} = req.body;
        let newId = Date.now()
        const product = {
          id: newId,
          name: name.trim(),
          price: parseFloat(price),
          discount:parseInt(discount),
          stock: parseInt(stock),
          description: description.trim(),
          image: filename,
          platform: platform.trim(),
          category: category.trim(),
          installments: parseInt(installments)
        }
      
        products.push(product);
        const productjson = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname,"../database/products.json"),productjson,"utf-8");
        res.redirect("/productos/dashboard")}
    },

  dashboard: (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, "../database/products.json"), "utf-8");
    const products = JSON.parse(json);
    res.render("products/dashboard", { title: "dashboard", products });
  },
	productsList: (req,res)=>{
		res.render("products/products", {products})
	},
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

  try { 
    const { name, price, stock, discount, platform, category, description, installments}=req.body
  const id= +req.params.id

const file=req.file
 if(!file){
  throw new Error("Debe elegir una imagen")
 }

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

}catch(error){
  res.send("Error, debes elegir una imagen")
}

},
destroy: (req, res) => {
  const { id } = req.params;
  const json = fs.readFileSync(path.join(__dirname, "../database/products.json"), "utf-8");
  const products = JSON.parse(json);
  const updatedProducts = products.filter(producto => producto.id != id);
  const updatedJson = JSON.stringify(updatedProducts);
  fs.writeFileSync(path.join(__dirname, "../database/products.json"), updatedJson, "utf-8");
  res.redirect("/productos/dashboard");
}
}

module.exports = productsController;
