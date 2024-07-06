const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // console.log(err)

    // Wrong Mongodb Id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message , 400)
    }

    // Mongoose JWT error
    if(err.code === 11000) {
        const message =`Duplicate ${Object.keys(err.keyValue)} entered !`
        err = new ErrorHandler(message , 400)

    }

    // err = new ErrorHandler(message , 400)

    // Wrong JWT error
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid , Try Again !`
        err = new ErrorHandler(message , 400)
    }

    //  JWT Expire error
    if(err.name === "TokenExpireError") {
        const message = `Json Web Token is Expired , Try Again !`
        err = new ErrorHandler(message , 400)
    }


//   if (err.name === "BSONError") {
//     const message = `Resource not found. Invalid: ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }




    res.status(err.statusCode).json({
        success :false,
        message : err.message
    });
};