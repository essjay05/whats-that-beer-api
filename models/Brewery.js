const mongoose = require('mongoose')
const brewerySchema = new mongoose.Schema({
    // breweryId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String },
    country: {type: String },
    dateEstablished: { type: Date },
    description: { type: String},
    locations: [{
      city: { type: String },
      region: { type: String }, /* ie. State, Province, Territory, etc */
      country: { type: String },
      streetAddress: { type: String },
      dateOpened: { type: Date },
      hours: { type: String }
    }],
    beers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer' }],
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo' /* Photo Schema *Bonus* */}],
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }]
  }, { timestamps: true })

const Brewery = mongoose.model('Brewery', brewerySchema)

module.exports = Brewery