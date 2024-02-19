require('dotenv').config()

const 
  BeerModel = require('../models/Beer.js'),
  { MongoClient } = require('mongodb'),
  { mongoDbUri } = require('../db.js'),
  wtbDBName = process.env.DB_NAME,
  beerCollName = process.env.BEER_COLLECTION

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const beerCollection = wtbDB.collection(beerCollName)

const createBeer = async (client, newBeer) => {
  const result = await beerCollection.insertOne(newBeer)
  console.log(`New Model was created with the following id: ${result.insertedId}`)
}

const createMultipleBeers = async (client, newBeers) => {
  const result = await beerCollection.insertMany(newBeers)
  console.log(result.insertedIds)
}

const findOneBeerByName = async (client, nameOfBeer) => {
  const result = await beerCollection.find(nameOfBeer)
  if (result) {
    console.log(`SUCCESS! Found Beer by name:`)
    console.log(result)
  } else {
    console.log(`ERROR: No Beer found.`)
  }
}

const findAllBeers = async (client, nameOfBeer) => {
  const result = await beerCollection.find()
  if (result) {
    console.log(`SUCCESS! Found all beers:`)
    console.log(result)
  } else {
    console.log(`ERROR: No Beer found.`)
  }
}

module.exports = {
  // Get all Beers
  index: (req, res) => {
    // findAllBeers()
    BeerModel.find()
      .then((beers) => {
        console.log(`Success found beers:`)
        console.log(beers)
        res.json(beers)
      })
      .catch(err => res.json(err))
  },
  // Find 1 beer
  show: async (req, res) => {
    const beerName = req.body.name
    console.log(`Show endpoint beerName provided:`)
    console.log(beerName)
    try {
      await wtbDB
      .collection(beerCollName)
      .find(beerName)
    } catch (err) {
      console.error(err)
    } finally {
      res.json({ message: `SUCCESS: Beer was found!`, payload: beerName })
    }
    // Beer.findById(req.params.name, (err, beer) => {
    //   if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
    //   res.json({ message: 'SUCCESS', payload: beer })
    // })
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
  // Create multiple new Beers
  createMany: async (req, res) => {
    const newBeers = req.body
    try {
      await createMultipleBeers(client, newBeers)
    } catch (err) {
      console.error(err)
    } finally {
      res.json({ message: `SUCCESS: New beers were created!`, payload: newBeers })
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
