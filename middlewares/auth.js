const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authN = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = verifyToken(access_token);

    const foundUser = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
      },
    });

    if (!foundUser) {
      throw { name: "InvalidToken" };
    }

    req.user = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authZ = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = verifyToken(access_token);

    const foundUser = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
      },
    });
    
    if (foundUser.role !== "admin") {
      throw { name: "Forbidden" };
    }
    
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { authN, authZ }