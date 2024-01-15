const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Ingresa un correo electrónico válido').bail(),
        body('password').isLength({ min: 5 }).withMessage('Las credenciales son incorrectas'),
      ];
    };

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();
}
  next();
};

module.exports = { loginValidationRules, validate };