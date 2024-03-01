const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(
  path.join(__dirname, "../database/products.json"),
  "utf-8"
);
const products = JSON.parse(json);
const db = require("../database/models/index");
const { validationResult } = require("express-validator");
const fileUpload = require("../Middlewares/productMulter");

const productsController = {
  carrito: (req, res) => {
    res.render("products/productCart");
  },
  productDetail: async (req, res) => {
    try {
      const productId = req.params.idProducto;
      const producto = await db.Product.findByPk(productId);
      const products = await db.Product.findAll();
      if (!producto) {
        return res.status(404).send("Producto no encontrado");
      }
      res.render("products/productDetail", { producto, products });
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
      res.status(500).send("Error al obtener detalles del producto");
    }
  },

  productForm: async (req, res) => {
    try {
      const brands = await db.Brand.findAll();
      const platforms = await db.Platform.findAll();
      const categories = await db.Category.findAll();
      res.render("products/productForm", { brands, platforms, categories });
    } catch (error) {
      console.error(
        "Error al obtener marcas, plataformas y categorías:",
        error
      );
      res.status(500).send("Error interno del servidor");
    }
  },
  create: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      price,
      stock,
      description,
      platform_id,
      category_id,
      installments,
      discount,
      brand_id,
    } = req.body;
    console.log(req.body);
    try {
      const newProduct = await db.Product.create({
        name: name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock),
        description: description,
        platform_id: platform_id,
        category_id: category_id,
        brand_id: brand_id,
        installments: parseInt(installments),
        discount: parseInt(discount),
        image: req.file.filename,
      });

      res.redirect("/productos/dashboard");
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Eliminar el archivo
    }
      console.error("Error al crear el producto:", error);
      res.status(500).send("Error al crear el producto");
    }
  },

    dashboard : async (req, res) => {
      try {
        // Obtener todos los productos desde la base de datos
        const products = await db.Product.findAll();
        res.render('products/dashboard', { title: 'dashboard', products });
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      }
    },
    
    productsList : async (req, res) => {
      try {
          const products = await db.Product.findAll();
          
          if (!products || products.length === 0) {
              return res.status(404).send("Producto no encontrado");
          }
          res.render("products/products", { products });
      } catch (error) {
          console.error("Error al obtener la lista de productos:", error);
          res.status(500).send("Error interno del servidor");
      }
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
      const {
        name,
        price,
        stock,
        discount,
        platform,
        category,
        description,
        installments,
      } = req.body;
      const id = +req.params.id;

      const file = req.file;
      if (!file) {
        throw new Error("Debe elegir una imagen");
      }

      /*  console.log(file) */
      let nuevobjeto = {
        id,
        name,
        price: +price,
        discount: +discount,
        stock: +stock,
        description,
        image: file ? file.filename : null,
        platform,
        category,
        installments,
      };
      console.log(nuevobjeto.image);
      let producto = products.map((elemento) => {
        if (elemento.id == id) {
          /* nuevobjeto.image = elemento.image */

          return nuevobjeto;
        }

        return elemento;
      });
      /*   console.log(producto) */
      /*  console.log(producto) */
      /* console.log(producto) */
      let json2 = JSON.stringify(producto);
      /*     console.log(json2) */
      fs.writeFileSync(
        path.join(__dirname, "../database/products.json"),
        json2,
        "utf-8"
      );
      res.redirect("/productos/dashboard");
    } catch (error) {
      res.send("Error, debes elegir una imagen");
    }
  },
  destroy: (req, res) => {
    const productId = req.params.id;

    db.Product.findOne({
        where: {
            id: productId,
        },
    })
    .then(product => {
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const imageName = product.image;
        const imagePath = `public/images/products/${imageName}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen:', err);
            } else {
                db.Product.destroy({
                    where: {
                        id: productId,
                    },
                })
                .then(() => {
                    res.redirect("/productos/dashboard");
                })
                .catch(err => console.error('Error al eliminar el producto:', err));
            }
        });
    })
    .catch(err => console.error('Error al buscar el producto:', err));
}

};

module.exports = productsController;
