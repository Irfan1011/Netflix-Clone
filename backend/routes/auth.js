const express = require("express");

const validationCheck = require("../controller/validationCheck");
const authController = require("../controller/auth");

const router = express.Router();

router.post(
  "/register",
  validationCheck.checkSignUp,
  validationCheck.validationHandler,
  authController.postRegister,
);
router.post(
  "/login",
  validationCheck.checkSignIn,
  validationCheck.validationHandler,
  authController.postLogin,
);
router.post("/logout", authController.postLogout);

module.exports = router;
