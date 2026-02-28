let express = require("express");
let userAuthRoutes = express.Router();
let { userRegister, verifyEmail, userLogin, forgetPassword } = require("../../controllers/web/userAuthControllers");

userAuthRoutes.post("/register", userRegister);
userAuthRoutes.post("/verifyEmail/:id", verifyEmail);
userAuthRoutes.post("/login", userLogin);
userAuthRoutes.post("/forgetPassword", forgetPassword);


module.exports = userAuthRoutes;
