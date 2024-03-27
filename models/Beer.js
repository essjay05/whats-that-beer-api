const mongoose = require('mongoose')
const beerSchema = new mongoose.Schema({
    beerId: { type: String, required: true },
    name: { type: String, required: true },
    abv: { type: String },
    type: { type: String},
    description: { type: String},
    brewery: { 
      type: String,
      ref: 'Brewery' /* Brewery Schema *Bonus* */ },
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo' /* Photo Schema *Bonus* */}],
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }]
  }, { timestamps: true })

const Beer = mongoose.model('Beer', beerSchema)

module.exports = Beer