require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

const hash = async (text, size) => {
  try {
    const salt = await bcrypt.genSalt(size)
    const hash = await bcrypt.hash(text, salt)
    return hash
  } catch (err) {
    console.error(err)
  }
}

const tokenizeUser = async (userId) => {
  // Assign JWT to user
  const userToken = jwt.sign({ _id: userId}, jwtKey, {
    expiresIn: '1d',
  })
  return userToken
}

module.exports = {
  hash,
  tokenizeUser
}