const
  mongoose = require('mongoose')
  photoSchema = new mongoose.Schema({
    imgUrl: { type: String, required: true },
    imgId: { type: String, required: true },
    beer: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer'}
  })