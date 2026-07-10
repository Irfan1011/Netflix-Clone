require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const errorController = require("./util/errors");
const mongoConnect = require("./util/database").mongoConnect;
const { isAuth } = require("./controller/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

//CORS Error fixed
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); //Which origin could use this server. This could also spesific example: 'Access-Control-Allow-Origin', 'codepen.io'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  ); //Allow the client to execute this method
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); //Allow the client to have access to content-type and authorization
  res.setHeader("Access-Control-Allow-Credentials", "true"); //Allow the client to send credentials
  next();
});

app.get("/isAuth", isAuth);
app.use("/auth", authRoutes);
app.use(errorController.get404);

//Express error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, error: data });
});

mongoConnect((client) => {
  app.listen(process.env.PORT);
});
