require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/User')
const { mongoDbUri } = require('../db.js')
const { hash } = require('../utils/AuthUtils.js')
const createError = require('../utils/appError')

const wtbDBName = process.env.DB_NAME
const usersCollName = process.env.USER_COLLECTION
const saltRounds = parseInt(process.env.SALT_ROUNDS)
const jwtKey = process.env.JWT_KEY

const client = new MongoClient(mongoDbUri)
const wtbDB = client.db(wtbDBName)
const usersCollection = wtbDB.collection(usersCollName)

const createUser = async (client, newUser) => {
  const result = await usersCollection.insertOne(newUser)
  console.log(`Success! New User was created with the following id: ${result.insertedId}.`)
  return result
}

const comparePrevUserData = (prevInfo, newInfo) => {
  let infoToSave;
  /**
   * If newInfo not null & (newInfo !== prevInfo) save new
   * info value. Else if newInfo is null or newInfo === prevInfo 
   * save prev info value.
   */
  if (!!newInfo && (newInfo !== prevInfo)) {
    infoToSave = newInfo;
  } else {
    infoToSave = prevInfo;
  }
  return infoToSave;
}

module.exports = {
  // Create new User
  create: async (req, res, next) => {
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
        return next(new createError(`User already exists!`, 409))
      } 
        
      const hashedPw = await hash(data.password, saltRounds)
      data.password = hashedPw
      const newUser = await createUser(client, data)
      console.log('NewUser:')
      console.log(newUser)

      // Assign JWT to user
      const token = jwt.sign({ _id: newUser.insertedId}, jwtKey, {
        expiresIn: '900',
      })
      res.status(201).json({
        status: 'Success',
        message: 'User registered successfully!',
        token,
      })
    } catch (err) {
      next(console.error(err))
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
       * Look up user data based on id and compare userUpdate values with existing user
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
}