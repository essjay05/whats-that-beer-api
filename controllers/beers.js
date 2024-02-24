require('dotenv').config()

const 
  BeerModel = require('../models/Beer.js'),
  { MongoClient, ObjectId } = require('mongodb'),
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

const findBeerByName = async (client, nameOfBeer) => {
  const result = await beerCollection.find({ name: nameOfBeer}).limit(5)
  if (result) {
    console.log(`SUCCESS! Found Beer by name:`)
    console.log(result)
  } else {
    console.log(`ERROR: No Beer found.`)
  }
}

module.exports = {
  // Get all Beers
  index: async (req, res) => {
    // findAllBeers()
    try {
      // Name: 1 returns in alpha order (-1 for reverse)
      // abv: -1 returns reverse order (strongest)
      const cursor = beerCollection.find({}).sort({ name: 1 })
      const allBeers = await cursor.toArray()
      res.status(200).json({ 
        message: `Success! ${allBeers.length} beer${allBeers.length > 1 ? 's': ''} found.`,
        payload: allBeers
      })
    } catch(err) {
      console.error(err)
    }
  },
  // Find 1 beer
  show: async (req, res) => {
    const beerId = req.params.id
    const beerObjId = new ObjectId(beerId)
    try {
      const foundBeer = await beerCollection.findOne({ _id: beerObjId })
      console.log(foundBeer)
      res.status(200).json({
        message: `Successfully found beer!`,
        payload: foundBeer
      })
      
    } catch (err) {
      console.error(err)
    }
  },
  // Find beers by name:
  searchByAbv: async (req,res) => {
    const beerAbv = req.params.abv
    try {
      // Name: 1 returns in alpha order (-1 for reverse)
      // abv: -1 returns reverse order (strongest)
      const cursor = beerCollection.find({abv: `${beerAbv}%`}).sort({ name: 1 })
      const foundBeers = await cursor.toArray()
      res.status(200).json({ 
        message: `Success! ${foundBeers.length} beer${foundBeers.length > 1 ? 's': ''} found.`,
        payload: foundBeers
      })
    } catch(err) {
      console.error(err)
    }
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
