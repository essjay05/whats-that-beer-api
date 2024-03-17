require('dotenv').config()

const 
  UserModel = require('../models/Users.js'),
  { MongoClient, ObjectId } = require('mongodb'),
  { mongoDbUri } = require('../db.js'),
  wtbDBName = process.env.DB_NAME,
  usersCollName = process.env.USER_COLLECTION

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const usersCollection = wtbDB.collection(usersCollName)

const createUser = async (client, newUser) => {
  const result = await usersCollection.insertOne(newUser)
  console.log(`Success! New User was created with the following id: ${result.insertedId}.`)
}

module.exports = {
  // Find all users
  index: async (req, res) => {
    try {
      // Since name value is 1, we're sorting in alpha order by name
      const cursor = usersCollection.find({}).sort({ name: 1})
      const allUsers = await cursor.toArray()
      res.status(200).json({
        message: `Success! ${allUsers.length} user${allUsers.length > 1 ? 's' : ''} found.`,
        payload: allUsers
      })
    } catch(err) {
      console.error(err)
    }
  },
  // Find 1 user
  show: async (req, res) => {
    const userId = req.params.id
    const userObjId = new ObjectId(userId)
    try {
      const foundUser = await usersCollection.findOne({ _id: userObjId })
      res.status(200).json({
        message: `Successfully found user!`
      })
    } catch (err) {
      res.json({ message: `User not found.` })
      console.error(err)
    }
  },
  // Create new User
  create: async (req, res) => {
      const newBeer = req.body
      try {
        await createUser(client, newBeer)
      } catch (err) {
        console.error(err)
      } finally {
        res.json({
          message: `SUCCESS: New user was registered!`,
          payload: newBeer
        })
      }
  },
  // Edit User
  update: async (req, res) => {
    const userId = req.params.id
    const userObjId = new ObjectId(userId)
    const userUpdate = req.body

    try {
      const result = await usersCollection.updateOne(
        { _id: userObjId },
        { $set: userUpdate }
      )
      res.status(200).json({
        message: `Successfully updated user!`,
        payload: result
      })
    } catch (err) {
      res.json({
        message: `No user found.`
      })
      console.error(err)
    }
  },
  // Delete User
  destroy: async (req, res) => {
    const userId = req.params.id
    const userObjId = new ObjectId(userId)
    try {
      const foundUser = await usersCollection.deleteOne({ _id: userObjId })
      console.log(foundUser)
      res.status(200).json({
        message: `Successfully deleted user!`,
        payload: foundUser
      })
    } catch(err) {
      res.json({
        message: `No user found.`
      })
      console.error(err)
    }
  }
  // Authenticate TBD
}
