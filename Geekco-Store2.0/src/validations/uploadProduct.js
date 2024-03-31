const { body } = require("express-validator");

const productUpdateValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Introducir nombre")
      .bail()
      .isLength({ min: 3, max: 30 })
      .withMessage("El nombre debe tener entre 3 y 30 caracteres")
      .bail(),
    body("description")
      .notEmpty()
      .withMessage("Introducir una descripción")
      .bail()
      .isLength({ min: 3, max: 300 })
      .withMessage("Debe tener entre 3 y 300 caracteres")
      .bail(),
      body("price")
      .notEmpty()
      .withMessage("Introducir precio")
      .bail()
      .isInt()
      .withMessage("Debe ser un número entero positivo")
      .bail(),
      body("category")
      .notEmpty()
      .withMessage("Elegir una categoría")
      .bail(),
      body("stock")
      .notEmpty()
      .withMessage("Introducir stock")
      .bail()
      .isInt({ min: 0, max: 100 })
      .withMessage("Debe elegir un stock entre 0 y 100")
      .bail(),
  ];
};

module.exports = {
  productUpdateValidator
}