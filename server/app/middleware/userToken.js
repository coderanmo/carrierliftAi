const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

let userToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ErrorHandler("Unauthorized: Missing or invalid token", 401));
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
}
module.exports = userToken;