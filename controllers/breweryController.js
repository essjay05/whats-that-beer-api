require('dotenv').config()

const Brewery = require('../models/Brewery.js')
const { MongoClient, ObjectId } = require('mongodb')
const { mongoDbUri } = require('../db.js')
const wtbDBName = process.env.DB_NAME
const breweryCollName = process.env.BREWERY_COLLECTION

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const breweryCollection = wtbDB.collection(breweryCollName)

const createBrewery = async (client, newBrewery) => {
  const result = await breweryCollection.insertOne(newBrewery)
  console.log(`New Brewery was created with the following id: ${result.insertedId}`)
}

module.exports = {
  // Get all Breweries
  index: async (req, res) => {
    // findAllBreweries()
    try {
      // Name: 1 returns in alpha order (-1 for reverse)
      // abv: -1 returns reverse order (strongest)
      const cursor = breweryCollection.find({}).sort({ name: 1 })
      const allBreweries = await cursor.toArray()
      res.status(200).json({ 
        message: `Success! ${allBreweries.length} brewer${allBreweries.length > 1 || allBreweries.length === 0 ? 'ies': 'y'} found.`,
        payload: allBreweries
      })
    } catch(err) {
      console.error(err)
    }
  },
  // Find 1 Brewery
  show: async (req, res) => {
    const breweryId = req.params.id
    const breweryObjId = new ObjectId(breweryId)
    try {
      const foundBrewery = await breweryCollection.findOne({ _id: breweryObjId })
      console.log(foundBrewery)
      res.status(200).json({
        message: `Successfully found brewery!`,
        payload: foundBrewery
      })
    } catch (err) {
      res.json({
        message: `No brewery found.`
      })
      console.error(err)
    }
  },
  // Create new Brewery
  create: async (req, res) => {
    const newBrewery = req.body
    try {
      await createBrewery(client, newBrewery)
    } catch (err) {
      console.error(err)
    } finally {
      res.json({ message: `SUCCESS: New brewery was created!`, payload: newBrewery })
    }
  },
  // Update 1 Brewery by ID
  updateOne: async (req, res) => {
    const breweryId = req.params.id
    const breweryObjId = new ObjectId(breweryId)
    const breweryUpdate = req.body

    try {
      const result = await breweryCollection.updateOne(
        { _id: breweryObjId },
        { $set: breweryUpdate }
      )

      res.status(200).json({
        message: `Successfully updated brewery!`,
        payload: result
      })
      
    } catch (err) {
      res.json({
        message: `No brewery found.`
      })
      console.error(err)
    }

  }
}
