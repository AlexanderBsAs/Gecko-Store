const db = require('../database/models');
const { validationResult } = require("express-validator");
const fileUpload = require("../Middlewares/productMulter");
const fs = require('fs');
const productsController = {

  carrito: (req, res) => {
    res.render("products/productCart")
  },
  productDetail: (req, res) => {
    db.Product.findByPk(req.params.idProducto, {
      include: [
        { association: "categories" }, { association: "brands" }, { association: "platforms" }
      ],
    })
      .then(resultado => {
        db.Product.findAll({
          include: [
            { association: "categories" }, { association: "brands" }, { association: "platforms" }
          ],
        })
          .then(resultados => {
            console.log(resultado)
            res.render("products/productDetail", {
              producto: resultado, products: resultados
            })
          })

      }
      )
      .catch(error => {
        res.send(error)
      })
  },
  productForm: (req, res) => {

    Promise.all([
      db.Brand.findAll(),
      db.Category.findAll(),
      db.Platform.findAll()
    ])
      .then(function ([ brands, categories, platforms]) {
        res.render("products/productForm", { brands, categories, platforms });
      });

  },
  create: async (req, res, next) => {
    const errores = validationResult(req);
    console.log("body:", req.body, "File:", req.file)
    if (!errores.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Eliminar el archivo
    }
    Promise.all([
      db.Brand.findAll(),
      db.Category.findAll(),
      db.Platform.findAll()
    ])
      .then(function ([brands, categories, platforms]) {
        return res.render('products/productForm', { errores: errores.mapped(), brands, categories, platforms });
      })
    } else {
    const { name, price, stock, description, platform_id, category_id, installments, discount, brand_id } = req.body;
    console.log(req.body)
    try {
      const newProduct = await db.Product.create({
        name: name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock),
        description: description,
        platform_id: platform_id ? platform_id : null,
        category_id: category_id,
        brand_id: brand_id,
        installments: installments ? parseInt(installments) : null,
        discount: discount ? parseInt(discount) : null,
        image: req.file ? req.file.filename : "default.jpg",
      });

      res.redirect("/productos/dashboard");
      
    } catch (error) {
      
      console.error("Error al crear el producto:", error);
      res.status(500).send("Error al crear el producto");
    }
  }
},

  dashboard: async (req, res) => {
    try {
      // Obtener todos los productos desde la base de datos
      const products = await db.Product.findAll();
      res.render('products/dashboard', { title: 'dashboard', products });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send('Error al obtener los productos');
    }
  },
  productsList: (req, res) => {
    db.Product.findAll()
      .then(resultado => {
        res.render("products/products", {
          products: resultado
        })
      })
  },
  edit: (req, res) => {
    const { id } = req.params;
    Promise.all([
      db.Product.findByPk(id, {
        include: ["brands", "categories", "platforms"],
      }),
      db.Brand.findAll(),
      db.Category.findAll(),
      db.Platform.findAll()
    ])
      .then(function ([product, brands, categories, platforms]) {
        res.render("products/formUpdate", { productos: product, brands, categories, platforms, id });
      });
  },

  update: (req, res) => {
    const { id } = req.params;
    const {
      name,
      price,
      stock,
      description,
      brands,
      platform,
      category,
      discount,
      installments
    } = req.body;
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores);
      Promise.all([
        db.Product.findByPk(id, {
          include: ["brands", "categories", "platforms"],
        }),
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Platform.findAll()
      ])
        .then(function ([product, brands, categories, platforms]) {
          return res.render('products/formUpdate', { errores: errores.mapped(), productos: product, brands, categories, platforms, id });
        })
    } else {
      const product = db.Product.findByPk(req.params.id)
      let file = req.file;
      console.log("image:", product.image)
      if (!file) {
         file = product.image
      }
      db.Product.update(
        {
          name,
          price,
          stock,
          description,
          image: file,
          brand_id: brands,
          platform_id: platform != 0 ? platform : null,
          category_id: category,
          discount,
          installments
        },
        {
          where: { id },
        },
        {
          include: ["brands", "categories", "platforms"],
        }
      ).then(function (product) {
        res.redirect("/productos/dashboard");
      });
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
