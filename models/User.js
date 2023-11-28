const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer'
    }]
  }, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User