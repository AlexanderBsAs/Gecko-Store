const { body } = require('express-validator');
const bcrypt = require("bcryptjs")
const fs = require ("fs")
const path = require("path")
const usersPath = path.join(__dirname, "../database/users.json");
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);

const loginValidationRules = [
  body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
  .isEmail().withMessage("El valor ingresado debe tener el formato de un correo electronico").bail()
  .custom(value => {
      console.log("value:",value);        
      const user = users.find(elemento => elemento.email == value);
      return user ? true : false
  }).withMessage("El E-mail ingresado no coincide con ningún usuario registrado"),

  body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
  .custom((value, {req} )=> {
      console.log("password:", value);
      const user = users.find(elemento => elemento.email == req.body.email)
      console.log("user:", user);
      console.log("user-password:", user.password);
      return bcrypt.compareSync(value, user.password);
  }).withMessage("La contraseña ingresada no es correcta")
];

module.exports =  loginValidationRules;

//.isStrongPassword({ 
 //   minLength: 4, 
 //   minLowercase: 1, 
 //   minUppercase: 1, 
 //   minNumbers: 1, 
  //  minSymbols: 1, 
 //   returnScore: false, 
 //   pointsPerUnique: 1, 
  //  pointsPerRepeat: 0.5, 
 //   pointsForContainingLower: 10, 
   // pointsForContainingUpper: 10, 
   // pointsForContainingNumber: 10, 
   // pointsForContainingSymbol: 10 })
//.withMessage('La CONTRASEÑA debe contener al menos 4 caracteres, entre ellos un numero, un simbolo y una mayuscula')//