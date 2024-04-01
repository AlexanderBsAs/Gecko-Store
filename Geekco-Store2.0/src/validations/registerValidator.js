const { body } = require("express-validator")
const db = require('../database/models')

let validacionRegistro = [
    body("first_name")
        .notEmpty().withMessage("*Debes poner un nombre").bail()
        .isLength({ min: 5, max: 15 }).withMessage("Debe ser entre 5 y 15 caracteres"),
    body("last_name").notEmpty().withMessage("* Debes poner un APELLIDO").bail()
        .isLength({ min: 2, max: 25 }).withMessage("Debe ser entre 2 y 25 caracteres"),
    body("email").notEmpty().withMessage("*Debes especificar un email").bail()
    .custom(value => {
        return db.User.findOne({
            where: {
                email: value
            }
        })
            .then(user => {
                if (user) {
                    return Promise.reject('El email se encuentra registrado')
                }
            })
            .catch(() => {
                return Promise.reject('El email se encuentra registrado')
            })
    })
    .isEmail().withMessage("debes escribir un mail valido"),
    body("password").notEmpty().withMessage("*Debes especificar una contraseña").bail(),
    body("address").notEmpty().withMessage("*Debes poner una direccion").bail(),
    body('birthday')
        .notEmpty().withMessage("Ingrese una fecha correcta").bail()
        .custom((value) => {
            // Verifica si la fecha de nacimiento proporcionada es mayor a 18 años
            let fechaNacimiento = new Date(value);
            let hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

            // Ajusta la edad si el cumpleaños aún no ha pasado este año
            if (
                hoy.getMonth() < fechaNacimiento.getMonth() ||
                (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())
            ) {
                edad--;
            }

            // Verifica si la edad es mayor o igual a 18
            if (edad < 18) {
                throw new Error('Debes ser mayor de 18 años para registrarte.');
            }

            // Devuelve true si la validación es exitosa
            return true;
        }),
    body("confirm_password")
        .custom((value, { req }) => {
            //Verifica que la contraseña sea idéntica a la confirmación de contraseña
            return value == req.body.password
        }).withMessage('Las contraseñas no coinciden'),
    body("image")
        .custom((value, { req }) => {
            if (req.errorValidationImage) {
                return false;
            };
            return true;
        }).withMessage("No es un tipo de archivo valido")

]
module.exports = { validacionRegistro }
