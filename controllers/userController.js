require('dotenv').config()

const UserModel = require('../models/User')
const { MongoClient, ObjectId } = require('mongodb')
const { mongoDbUri } = require('../db.js')

const wtbDBName = process.env.DB_NAME
const usersCollName = process.env.USER_COLLECTION

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const usersCollection = wtbDB.collection(usersCollName)

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
      const { name, email, password } = foundUser
      res.status(200).json({
        message: `Successfully found user!`,
        user: { name, email, password }
      })
    } catch(err) {
      res.json({ message: `User not found.` })
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
}
