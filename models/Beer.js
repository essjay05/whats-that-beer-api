const
  mongoose = require('mongoose'),
  beerSchema = new mongoose.Schema({
    beerId: { type: String, required: true },
    name: { type: String },
    abv: { type: String },
    type: { type: String},
    brewery: { type: String},
    description: { type: String},
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo' /* Photo Schema *Bonus* */}],
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }]
  }, { timestamps: true })

  const Beer = new mongoose.model('Beer', beerSchema)
  module.exports = Beer