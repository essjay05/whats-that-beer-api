const 
  Beer = require('../models/Beer.js'),
  { MongoClient } = require('mongodb'),
  { mongoDbUri } = require('../db.js')

const client = new MongoClient(mongoDbUri)

const createBeer = async (client, newBeer) => {
  const result = await client.db(process.env.DB_NAME).collection(process.env.BEER_COLLECTION).insertOne(newBeer)
  console.log(`New beer was created with the following id: ${result.insertedId}`)
}

const createMultipleBeers = async (client, newBeers) => {
  const result = await client.db('whats-that-beer-db').collection('beersAndReviews')
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
    const newBeer = req.body
    try {
      await createBeer(client, newBeer)
    } catch (err) {
      console.error(err)
    } finally {
      res.json({ message: `SUCCESS: New beer was created!`, payload: newBeer })
    }
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
