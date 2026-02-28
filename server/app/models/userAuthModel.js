let mongoose = require("mongoose");

let userAuthSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userEmail: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userPhone: {
        type: String,
        trim: true,
    },
    refreshToken: {
        type: String,
        default: "",
    },
    accessToken: {
        type: String,
        default: "",
    },
    verifyToken: {
        type: String,
        default: "",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    expireToken: {
        type: Date,
        default: Date.now,
    },
    userStatus: {
        type: Boolean,
        default: true,
    }

});


let userAuthModel = mongoose.model("userAuth", userAuthSchema);
module.exports = userAuthModel;
