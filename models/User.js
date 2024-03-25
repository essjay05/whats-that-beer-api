const
  mongoose = require('mongoose'),
  // bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer'
    }]
  }, { timestamps: true })

const User = new mongoose.model('User', userSchema)
module.exports = User