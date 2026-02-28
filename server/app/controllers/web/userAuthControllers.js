const userAuthModel = require("../../models/userAuthModel");
let bcrypt = require("bcrypt");
let crypto = require("crypto");
let sendEmail = require("../../config/email");
let validate = require("validator");
const ErrorHandler = require("../../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

let userRegister = async (req, res, next) => {
    try {
        let { userEmail, userPassword, userName, userPhone } = req.body;
        let missingFields = [];
        if (!userEmail) missingFields.push("userEmail");
        if (!userPassword) missingFields.push("userPassword");
        if (!userName) missingFields.push("userName");

        if (missingFields.length > 0) {
            return next(new ErrorHandler(`${missingFields.join(", ")} is required`, 400));
        }

        if (!validate.isEmail(userEmail)) {
            return next(new ErrorHandler("Invalid email", 400));
        }
        if (!validate.isStrongPassword(userPassword)) {
            return next(new ErrorHandler("Invalid password", 400));
        }
        let checkEmail = await userAuthModel.findOne({ userEmail });
        if (checkEmail) {
            return next(new ErrorHandler("User already exists", 400));
        }
        let verifyLink = crypto.randomBytes(32).toString("hex");
        const hash = bcrypt.hashSync(userPassword, 10);
        sendEmail(userEmail, verifyLink);
        let user = new userAuthModel({
            userEmail,
            userPassword: hash,
            userName,
            verifyToken: verifyLink,
            userPhone,
            expireToken: Date.now() + 10 * 60 * 1000,
        });
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    }
    catch (error) {
        next(error);
    }
}
let verifyEmail = async (req, res, next) => {
    try {
        let { id } = req.params;
        let user = await userAuthModel.findOne({ verifyToken: id });
        if (!user) {
            return next(new ErrorHandler("Invalid or expired token", 404));
        }

        if (user.expireToken < Date.now()) {
            await userAuthModel.findByIdAndDelete(user._id);
            return next(new ErrorHandler("Token expired. Please register again.", 400));
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.expireToken = undefined;
        await user.save();
        res.status(200).json({ success: true, message: "User verified successfully" });
    }
    catch (error) {
        next(error);
    }
}
let userLogin = async (req, res, next) => {
    try {
        let { userEmail, userPassword } = req.body;
        let missingFields = [];
        if (!userEmail) missingFields.push("userEmail");
        if (!userPassword) missingFields.push("userPassword");
        if (missingFields.length > 0) {
            return next(new ErrorHandler(`${missingFields.join(", ")} is required`, 400));
        }
        if (!validate.isEmail(userEmail)) {
            return next(new ErrorHandler("Invalid email", 400));
        }
        let user = await userAuthModel.findOne({ userEmail });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        if (!user.isVerified) {
            return next(new ErrorHandler("User not verified", 400));
        }
        if (!bcrypt.compareSync(userPassword, user.userPassword)) {
            return next(new ErrorHandler("Invalid password", 400));
        }
        let token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" });
        res.status(200).json({ success: true, message: "User logged in successfully", token });
    }
    catch (error) {
        next(error);
    }
}

let forgetPassword = async (req, res, next) => {
    try {
        let { userEmail } = req.body;
        if (!userEmail) {
            return next(new ErrorHandler("userEmail is required", 400));
        }
        if (!validate.isEmail(userEmail)) {
            return next(new ErrorHandler("Invalid email", 400));
        }
        let user = await userAuthModel.findOne({ userEmail });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        let token = crypto.randomBytes(32).toString("hex");
        user.verifyToken = token;
        user.expireToken = Date.now() + 10 * 60 * 1000;
        await user.save();
        sendEmail(userEmail, token);
        res.status(200).json({ success: true, message: "Forget password email sent successfully" });
    }
    catch (error) {
        next(error);
    }
}


module.exports = { userRegister, verifyEmail, userLogin, forgetPassword }
