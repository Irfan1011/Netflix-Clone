const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 10);
    const user = await new User(email, hashedPw);
    await user.save();

    res.status(200).json({ message: "Register Success", data: user });
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(email);
    if (!user) {
      const err = new Error(`User not Found`);
      err.status = 404;
      throw err;
    }

    const matchPw = await bcrypt.compare(password, user.password);
    if (!matchPw) {
      const err = new Error(`Password doesn't match`);
      err.status = 400;
      throw err;
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SIGNATURE, {
      expiresIn: 60 * 15, //15 minutes expires, this counts on sec (60*15 = 900 second = 15 minutes)
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Login Success", data: { ...user } });
  } catch (err) {
    next(err);
  }
};

exports.postLogout = (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "Logged Out" });
};

exports.isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const err = new Error("Not Authenticated");
    err.statusCode = 401;
    throw err;
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SIGNATURE);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error("Not Authenticated");
    err.statusCode = 401;
    throw err;
  }

  res.status(200).json({ message: "Authenticated", data: { ...decodedToken } });
};
