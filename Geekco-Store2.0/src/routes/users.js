const express = require("express");
const router = express.Router();
const {
  login,
  userLogin,
  register,
  userRegister,
  userUpdateForm,
  userUpdate,
  updatePasswordForm,
  updatePassword,
} = require("../controllers/usersController");
const {
  loginValidationRules,
  validation,
} = require("../validations/loginValidator");
const {
  userUpdateValidator,
  userUpdatePasswordValidator,
} = require("../validations/userUpdateValidator");
/* GET users listing. */
router.get("/login", login);
router.post("/login", loginValidationRules(), userLogin);

router.get("/registro", register);
router.post("/registro", userRegister);

router.get("/update/:id", userUpdateForm);
router.put("/update/:id", userUpdateValidator(), userUpdate);

router.get("/passwordUpdate/:id", updatePasswordForm);
router.put(
  "/passwordUpdate/:id",
  userUpdatePasswordValidator(),
  updatePassword
);

module.exports = router;
