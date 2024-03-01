const { body } = require("express-validator");


const productCreateValidator = [
  // Validación del campo "name"
  body('name')
    .notEmpty().withMessage('El campo Nombre es obligatorio'),

  // Validación del campo "price"
  body('price')
    .notEmpty().withMessage('El campo Precio es obligatorio')
    .isNumeric().withMessage('El campo Precio debe ser un número'),

  // Validación del campo "discount" (opcional)
  body('discount')
    .optional()
    .isNumeric().withMessage('El campo Descuento debe ser un número'),

  // Validación del campo "installments" (opcional)
  body('installments')
    .optional()
    .isNumeric().withMessage('El campo Cuotas debe ser un número'),

  // Validación del campo "stock"
  body('stock')
    .notEmpty().withMessage('El campo Stock es obligatorio')
    .isNumeric().withMessage('El campo Stock debe ser un número'),

  // Validación del campo "description"
  body('description')
    .notEmpty().withMessage('El campo Descripción es obligatorio'),

  // Validación del campo "platform" (opcional)
  body('platform_id')
    .optional(),


    // Validación del campo "category"
  body('brand_id')
  .notEmpty().withMessage('El campo Marca es obligatorio'),

  // Validación del campo "category"
  body('category_id')
    .notEmpty().withMessage('El campo Categoría es obligatorio'),

  // Validación del campo "image"
  body('image')
    .custom((value, { req }) => {
      // Verificar si se adjuntó una imagen
      if (!req.file) {
        throw new Error('Debe adjuntar una imagen');
      }
      // Verificar si el archivo adjuntado es una imagen
      const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedFormats.includes(req.file.mimetype)) {
        throw new Error('El archivo adjuntado debe ser una imagen (JPEG, PNG, GIF)');
      }
      // Si la validación pasa, devolver true
      return true;
    })
];

module.exports = productCreateValidator
