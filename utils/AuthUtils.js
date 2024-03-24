const bcrypt = require('bcrypt');

const hash = async (text, size) => {
  try {
    const salt = await bcrypt.genSalt(size)
    const hash = await bcrypt.hash(text, salt)
    return hash
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  hash
}