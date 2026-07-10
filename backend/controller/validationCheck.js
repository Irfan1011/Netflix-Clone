const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

exports.checkSignUp = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      const user = await User.findOne(value);
      if (user) {
        return Promise.reject("Email already exist");
      }
      return Promise.resolve();
    })
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should at least 6 length")
    .not()
    .isEmpty()
    .trim(),
  check("confirm-password")
    .not()
    .isEmpty()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Confirm password is not equal");
      }
      return Promise.resolve();
    }),
];

exports.checkSignIn = [
  check("email", "Email is Invalid")
    .not()
    .isEmpty()
    .isEmail()
    .trim()
    .custom(async (value, { req }) => {
      const user = await User.findOne(value);
      if (!user) {
        return Promise.reject("User is Not Exist");
      }
      return Promise.resolve();
    }),
  check("password")
    .not()
    .isEmpty()
    .trim()
    .custom(async (value, { req }) => {
      const user = await User.findOne(req.body.email);
      const matchPw = await bcrypt.compare(value, user.password);
      if (!matchPw) {
        return Promise.reject("Password is Incorrect");
      }
      return Promise.resolve();
    }),
];

exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  } else {
    next();
  }
};
