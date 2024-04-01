const express = require("express");
const router = express.Router();
const {
  login,
  userLogin,
  register,
  userRegister,
  logout,
  userUpdateForm,
  userUpdate,
  updatePasswordForm,
<<<<<<< HEAD
  updatePassword
=======
  updatePassword,
  updateAddressForm,
  updateAddress
>>>>>>> bba4cc91ac4d70c5261203b1378dcf0d9c65193d
} = require("../controllers/usersController");
const loginValidationRules = require("../validations/loginValidator");
const guestMiddleware = require("../Middlewares/guestMiddleware");
const userAuthMiddleware = require("../Middlewares/userAuthMiddleware");
const { validacionRegistro } = require("../validations/registerValidator");
const upload = require("../validations/uploadUser");

const {
  userUpdateValidator,
  userUpdatePasswordValidator,
  addressUpdateValidator
} = require("../validations/userUpdateValidator");

/* GET users listing. */
router.get('/login',guestMiddleware,login );
router.post('/login',loginValidationRules, userLogin );
router.get('/registro',guestMiddleware,validacionRegistro,register );

router.post('/registro',upload.single('image'),validacionRegistro,userRegister );
// Ruta de logout del usuario
router.get("/logout", logout);

router.get("/update/:id", 
userAuthMiddleware,
userUpdateForm);
router.put("/update/:id",
upload.single('image'), 
userUpdateValidator(), 
userUpdate);

<<<<<<< HEAD
router.get("/passwordUpdate/:id",userAuthMiddleware, updatePasswordForm);
router.put(
  "/passwordUpdate/:id",
  userUpdatePasswordValidator(),
  updatePassword
);
module.exports = router;
=======
router.get("/passwordUpdate/:id",
userAuthMiddleware,
updatePasswordForm);
router.put( "/passwordUpdate/:id",
userUpdatePasswordValidator(),
updatePassword);

router.get("/addressUpdate/:id", 
userAuthMiddleware, 
updateAddressForm);
router.put("/addressUpdate/:id", 
addressUpdateValidator(), 
updateAddress);

module.exports = router;
>>>>>>> bba4cc91ac4d70c5261203b1378dcf0d9c65193d
