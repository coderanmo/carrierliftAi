const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
        err.message = message;
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.statusCode = 400;
        err.message = message;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join(", ");
        err.statusCode = 400;
        err.message = message;
    }


    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err.statusCode = 400;
        err.message = message;
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err.statusCode = 400;
        err.message = message;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = errorMiddleware;
