const jwt = require('jsonwebtoken')

const secretJWT = 'secret_jwt'

const signToken = (payload) => {
  return jwt.sign(payload, secretJWT)
}

const verifyToken = (token) => {
  return jwt.verify(token, secretJWT)
}

module.exports = {
  signToken,
  verifyToken
}