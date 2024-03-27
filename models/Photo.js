const mongoose = require('mongoose')
const photoSchema = new mongoose.Schema({
    imgUrl: { type: String, required: true },
    imgId: { type: String, required: true },
    beer: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer'
    }],
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },  { timestamps: true })

  const Photo = mongoose.model('Photo', photoSchema)
  module.exports = Photo