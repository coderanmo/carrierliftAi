let express = require("express");
let webRoutes = express.Router();
let userAuthRoutes = require("./userAuthRoutes");
let userResumeRoutes = require("./userResumeRoutes");

webRoutes.use("/userauth", userAuthRoutes);
webRoutes.use("/resume", userResumeRoutes);

module.exports = webRoutes;