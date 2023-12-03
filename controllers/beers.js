const User = require('../models/Beer.js')

module.exports = {
  // Get all beers
  index: (req, res) => {
    Beer.find({}, (err, beers) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: beers })
    })
  },
  // Find 1 beer
  show: (req, res) => {
    Beer.findById(req.params.id, (err, beer) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: beer })
    })
  },
  // Create new Beer
  create: (req, res) => {
    Beer.create(req.body, (err, newBeer) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      // const token = signToken(newBeer)
      res.json({ message: `SUCCESS created newBeer: ${newBeer}`})
    })
  },
  // Edit Beer
  update: (req, res) => {
    Beer.findById(req.params.id, (err, updatedBeer) => {
      if (!req.body.password) delete req.body.password
      Object.assign(updatedBeer, req.body)
      updatedBeer.save((err, updatedBeer) => {
        if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
        res.json({ message: `SUCCESS profile is updated`, payload: updatedBeer })
      })
    })
  },
  // Delete Beer
  destroy: (req, res) => {
    Beer.findByIdAndRemove(req.params.id, (err, deletedBeer ) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: `SUCCESS ${deletedBeer} has been deleted.`, payload: deletedBeer })
    })
  }
  // Authenticate TBD
}
