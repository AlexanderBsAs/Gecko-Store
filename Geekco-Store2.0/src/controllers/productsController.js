const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(
  path.join(__dirname, "../database/products.json"),
  "utf-8"
);
const products = JSON.parse(json);
const db = require("../database/models");
const { validationResult } = require('express-validator');


const productsController = {
  carrito: (req, res) => {
    res.render("products/productCart");
  },
  productDetail: (req, res) => {
    const json = fs.readFileSync(
      path.join(__dirname, "../database/products.json"),
      "utf-8"
    );
    const products = JSON.parse(json);
    const id = req.params.idProducto;
    const producto = products.find((element) => element.id == id);
    res.render("products/productDetail", { producto, products });
  },
  productForm: (req, res) => {
    res.render("products/productForm");
  },
  create: (req, res, next) => {
    console.log("Files:", req.file.filename);
    console.log("Body:", req.body);
    const filename = req.file.filename;
    const json = fs.readFileSync(
      path.join(__dirname, "../database/products.json"),
      "utf-8"
    );
    const products = JSON.parse(json);

    if (!req.file) {
      return res.status(400).send("Por favor seleccione un archivo");
    } else {
      const {
        name,
        price,
        stock,
        description,
        image,
        platform,
        category,
        installments,
        discount,
      } = req.body;
      let newId = Date.now();
      const product = {
        id: newId,
        name: name.trim(),
        price: parseFloat(price),
        discount: parseInt(discount),
        stock: parseInt(stock),
        description: description.trim(),
        image: filename,
        platform: platform.trim(),
        category: category.trim(),
        installments: parseInt(installments),
      };

      products.push(product);
      const productjson = JSON.stringify(products);
      fs.writeFileSync(
        path.join(__dirname, "../database/products.json"),
        productjson,
        "utf-8"
      );
      res.redirect("/productos/dashboard");
    }
  },

  dashboard: (req, res) => {
    let json = fs.readFileSync(
      path.join(__dirname, "../database/products.json"),
      "utf-8"
    );
    const products = JSON.parse(json);
    res.render("products/dashboard", { title: "dashboard", products });
  },
  productsList: (req, res) => {
    res.render("products/products", { products });
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
    .then(function ([product,brands,categories,platforms]) {
      res.render("products/formUpdate", { productos: product,brands,categories,platforms, id });
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
      return res.render('products/formUpdate', { errors: errores.array() });
  }
    const file = req.file;
      if (!file) {
        throw new Error("Debe elegir una imagen");
      }
    db.Product.update(
      {
        name,
        price,
        stock,
        description,
        image: file ? file.filename: "default.webp",
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
      res.send(product);
    });
  },
  destroy: (req, res) => {
    const { id } = req.params;
    const json = fs.readFileSync(
      path.join(__dirname, "../database/products.json"),
      "utf-8"
    );
    const products = JSON.parse(json);
    const updatedProducts = products.filter((producto) => producto.id != id);
    const updatedJson = JSON.stringify(updatedProducts);
    fs.writeFileSync(
      path.join(__dirname, "../database/products.json"),
      updatedJson,
      "utf-8"
    );
    res.redirect("/productos/dashboard");
  },
};

module.exports = productsController;
