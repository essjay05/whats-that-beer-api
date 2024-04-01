require('dotenv').config()

const Beer = require('../models/Beer.js')
const { MongoClient, ObjectId } = require('mongodb')
const { mongoDbUri } = require('../db.js')
const wtbDBName = process.env.DB_NAME
const beerCollName = process.env.BEER_COLLECTION

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
  const cursor = await beerCollection.find({ name: nameOfBeer}).limit(5)
  if (result) {
    console.log(`SUCCESS! Found Beer by name:`)
    console.log(result)
  } else {
    console.log(`ERROR: No Beer found.`)
  }
}



const updateBeerById = async (client, beerId, updatedBeer) => {
  const beerObjId = new ObjectId(beerId)
  const result = await beerCollection.updateOne({ _id: beerObjId }, { $set: updatedBeer })
}

const upsertBeerByName = async (client, nameOfBeer, updatedBeer) => {
  const result = await beerCollection.updateOne({ name: nameOfBeer }, { $set: updatedBeer}, { upsert: true })
  
  console.log(`${result.matchedCount} document(s) matched the query criteria.`)
  
  if (result.upsertedCount > 0) {
    console.log(`One document was inserted with the id ${result.upsertedId}.`)
  } else {
    console.log(`${result.modifiedCount} document(s) were updated.`)
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
      res.json({
        message: `No beer found.`
      })
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
  // Update 1 Beer by ID
  updateOne: async (req, res) => {
    const beerId = req.params.id
    const beerObjId = new ObjectId(beerId)
    const beerUpdate = req.body

    try {
      const result = await beerCollection.updateOne(
        { _id: beerObjId },
        { $set: beerUpdate }
      )

      res.status(200).json({
        message: `Successfully updated beer!`,
        payload: result
      })
      
    } catch (err) {
      res.json({
        message: `No beer found.`
      })
      console.error(err)
    }

  },
  // Upsert (update 1 and/or insert)
  upsert: async (req, res) => {
    const beerName = req.params.name
    const beerUpdate = req.body
    console.log(`beerName: ${beerName}`)
    console.log('beerUPdate is:')
    console.log(beerUpdate)

    try {
      const result = await upsertBeerByName(client, beerName, beerUpdate)
      res.status(200).json({
        message: `Successfully updated beer!`,
        payload: result
      })
    } catch (err) {
      console.error(err)
    }

  },
  // Delete Beer
  destroy: async (req, res) => {
    const beerId = req.params.id
    const beerObjId = new ObjectId(beerId)
    try {
      const foundBeer = await beerCollection.deleteOne({ _id: beerObjId })
      console.log(foundBeer)
      res.status(200).json({
        message: `Successfully deleted beer!`,
        payload: foundBeer
      })
      
    } catch (err) {
      res.json({
        message: `No beer found.`
      })
      console.error(err)
    }
  }
  // Authenticate TBD
}
