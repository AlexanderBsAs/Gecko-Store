const db = require("../database/models/index");
const { validationResult } = require("express-validator");
const fileUpload = require("../Middlewares/productMulter");

const productsController = {

  carrito: (req, res) => {
    res.render("products/productCart")
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

  productForm: (req, res) => {

    res.render('products/productForm',);

  },
  create: async (req, res, next) => {
    const errors = validationResult(req);
    console.log("body:", req.body, "File:", req.file)
    if (!errors.isEmpty()) {
      console.log("errores:", errors)
      return res.render("products/productForm", { errors: errors.mapped(), old: req.body });
    };
    const { name, price, stock, description, platform_id, category_id, installments, discount, brand_id } = req.body;
    console.log(req.body)
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
        image: req.file ? req.file.filename : "default.jpg",
      });

      res.redirect("/productos/dashboard");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).send("Error al crear el producto");
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

  productsList: async (req, res) => {
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
      const actualImage = product.image
      console.log("image:",actualImage)
      if (!file) {
        const file = actualImage
      }
      db.Product.update(
        {
          name,
          price,
          stock,
          description,
          image: file ,
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
