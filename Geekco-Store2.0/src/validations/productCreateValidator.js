const { body } = require("express-validator");


const productCreateValidator = [
  body('name')
    .notEmpty().withMessage('El campo Nombre es obligatorio').bail()
    .isLength({min: 10, max: 40}).withMessage('La cantidad mínima de carácteres es de 10 y la máxima de 40').bail(),
  body('price')
    .notEmpty().withMessage('El campo Precio es obligatorio').bail()
    .isNumeric().withMessage('El campo Precio debe ser un número').bail(),
  body('discount')
    .optional()
    .isNumeric().withMessage('El campo Descuento debe ser un número')
    .bail(),
  body('installments')
    .optional()
    .isNumeric().withMessage('El campo Cuotas debe ser un número')
    .bail(),
  body('stock')
    .notEmpty().withMessage('El campo Stock es obligatorio')
    .isNumeric().withMessage('El campo Stock debe ser un número')
    .bail(),
  body('description')
    .notEmpty().withMessage('El campo Descripción es obligatorio')
    .bail(),
  body('platform_id').optional(),
  body('brand_id')
  .notEmpty().withMessage('El campo Marca es obligatorio'),
  body('category_id')
    .notEmpty().withMessage('El campo Categoría es obligatorio')
];

module.exports = productCreateValidator
