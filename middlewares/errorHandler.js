const errors = (err, req, res, next) => {
    let code = 500;
    let msg = "Internal server error";
  
    console.log(err);
    if (err.name === "SequelizeValidationError") {
      code = 400;
      msg = err.errors[0].message;
    } else if (err.name === "SequelizeUniqueConstraintError") {
      code = 400;
      msg = err.errors[0].message;
    } else if (err.name === "InvalidInput") {
      code = 401;
      msg = "Invalid username/password";
    } else if (err.name === "JsonWebTokenError") {
      code = 400;
      msg = "You must login first";
    } else if (err.name === "InvalidToken") {
      code = 400;
      msg = "Invalid token";
    } else if (err.name === "NotFound") {
      code = 404;
      msg = "Data not found";
    } else if (err.name === "ItemNotFound") {
      code = 404;
      msg = "Item not found";
    } else if (err.name === "UserNotFound") {
      code = 404;
      msg = "User not found";
    } else if (err.name === "Forbidden") {
      code = 403;
      msg = "You're not authorized";
    } else if (err.name === "InvalidPass") {
      code = 400
      msg = "Invalid Password"
    }
  
    res.status(code).json({ message: msg });
  };
  
  module.exports = errors;