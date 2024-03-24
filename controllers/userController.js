require('dotenv').config()

const 
  UserModel = require('../models/User.js'),
  { MongoClient, ObjectId } = require('mongodb'),
  bcrypt = require('bcrypt'),
  { mongoDbUri } = require('../db.js'),
  wtbDBName = process.env.DB_NAME,
  usersCollName = process.env.USER_COLLECTION,
  saltRounds = parseInt(process.env.SALT_ROUNDS)

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const usersCollection = wtbDB.collection(usersCollName)

const createUser = async (client, newUser) => {
  const result = await usersCollection.insertOne(newUser)
  console.log(`Success! New User was created with the following id: ${result.insertedId}.`)
}
const comparePrevUserData = (prevInfo, newInfo) => {
  let infoToSave;
  /**
   * If newInfo not null & (newInfo !== prevInfo) save new
   * info value.
   * Else if newInfo is null or newInfo === prevInfo save
   * prev info value.
   */
  console.log(`prevInfo: ${prevInfo} | newInfo: ${newInfo}`)
  if (!!newInfo && (newInfo !== prevInfo)) {
    infoToSave = newInfo;
  } else {
    infoToSave = prevInfo;
  }
  return infoToSave;
}

const hash = async (text, size) => {
  try {
    const salt = await bcrypt.genSalt(size)
    const hash = await bcrypt.hash(text, salt)
    return hash
  } catch (err) {
    console.error(err)
  }
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
    } catch(err) {
      res.json({ message: `User not found.` })
      console.error(err)
    }
  },
  // Login user
  login: async (req, res) => {
    try {
      const existingUser = await usersCollection.findOne({ email: req.body.email })
      if (!existingUser) {
        res.status(409).json({ message: `User email not found.`})
      }
      const isPwMatch = await bcrypt.compare(req.body.password, existingUser.password)
      if (isPwMatch) {
        res.status(200).json({ message: `User is logged in!`})
      } else {
        res.json({ message: `Wrong password.`})
      }
    } catch(err) {
      console.error(err)
    }
  },
  // Create new User
  create: async (req, res) => {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      try {
        const existingUser = await usersCollection.findOne({ email: data.email })
        if (existingUser) {
          res.status(409).json({
            message: `User already exists. Please choose a different email.`})
        } else {
          
          const hashedPw = await hash(data.password, saltRounds)
          data.password = hashedPw
          await createUser(client, data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        res.status(201).json({
          message: `SUCCESS: New user was registered!`,
          payload: data
        })
      }
  },
  // Edit User
  update: async (req, res) => {
    const userId = req.params.id
    const userObjId = new ObjectId(userId)
    const userUpdate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    try {
      // Check for existing user and grab previously hashed PW:
      const existingUser = await usersCollection.findOne({ _id: userObjId })
      const prevName = existingUser.name
      const prevEmail = existingUser.email
      const prevPw = existingUser.password

      /** 
       * Todo: look up user data based on id and compare userUpdate values with existing user
       * values and if userUpdate has null values, use the existing user values so it doesn't
       * get nulled on save if nothing is entered in the update req.
      */ 

      const newName = userUpdate.name
      const newEmail = userUpdate.email
      const newHashedPw = await hash(userUpdate.password, saltRounds)

      // Compare new vs old data
      userUpdate.name = comparePrevUserData(prevName, newName)
      userUpdate.email = comparePrevUserData(prevEmail, newEmail)
      userUpdate.password = comparePrevUserData(prevPw, newHashedPw)

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
