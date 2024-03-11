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
  index: (req, res) => {
    Users.find({}, (err, users) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: users })
    })
  },
  // Find 1 user
  show: (req, res) => {
    Users.findById(req.params.id, (err, user) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: user })
    })
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
  update: (req, res) => {
    Users.findById(req.params.id, (err, updatedUser) => {
      if (!req.body.password) delete req.body.password
      Object.assign(updatedUser, req.body)
      updatedUsers.save((err, updatedUser) => {
        if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
        res.json({ message: `SUCCESS profile is updated`, payload: updatedUser })
      })
    })
  },
  // Delete User
  destroy: (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, deletedUser ) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: `SUCCESS ${deletedUser} has been deleted.`, payload: deletedUser })
    })
  }
  // Authenticate TBD
}
