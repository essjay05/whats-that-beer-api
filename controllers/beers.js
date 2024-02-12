const 
  Beer = require('../models/Beer.js'),
  { MongoClient } = require('mongodb'),
  { mongoDbUri } = require('../db.js')

const client = new MongoClient(mongoDbUri)

const createBeer = async (client, newBeer) => {
  const result = await client.db('whats-that-beer-db').collection('beersAndReviews').insertOne(newBeer)
  console.log(`New beer was created with the following id: ${result.insertedId}`)
}


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
  create: async (req, res) => {
    const result = await createBeer(client, req.body)
    res.json({ message: `SUCCESS: New beer was created with the following id: ${result.insertedId}`})
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
