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
  updatePassword,
  updateAddressForm,
  updateAddress,
  listUsers,
} = require("../controllers/usersController");
const loginValidationRules = require("../validations/loginValidator");
const guestMiddleware = require("../Middlewares/guestMiddleware");
const userAuthMiddleware = require("../Middlewares/userAuthMiddleware");
const { validacionRegistro } = require("../validations/registerValidator");
const upload = require("../validations/uploadUser");

const {
  userUpdateValidator,
  userUpdatePasswordValidator,
} = require("../validations/userUpdateValidator");

/* GET users listing. */
router.get("/login", guestMiddleware, login);
router.post("/login", loginValidationRules, userLogin);
router.get("/registro", guestMiddleware, validacionRegistro, register);
router.post(
  "/registro",
  upload.single("image"),
  validacionRegistro,
  userRegister
);
// Ruta de logout del usuario
router.get("/logout", logout);

router.get("/update/:id", 
userAuthMiddleware, 
userUpdateForm);
router.put("/update/:id", 
//userUpdateValidator(), 
userUpdate);

router.get("/passwordUpdate/:id", 
userAuthMiddleware,
 updatePasswordForm);
router.put(
  "/passwordUpdate/:id",
// userUpdatePasswordValidator(),
  updatePassword
);
router.get("/addressUpdate/:id",updateAddressForm);
router.put("/addressUpdate/:id",updateAddress);
//router.get("/list",listUsers)

module.exports = router;
