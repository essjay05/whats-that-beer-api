const User = require('../models/User.js')
const {client, myMongoDb} = require('../db.js')

const usersCollection = myMongoDb.collection('users')


module.exports = {
  // Find all users
  index: (req, res) => {
    User.find({}, (err, users) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: users })
    })
  },
  // Find 1 user
  show: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: 'SUCCESS', payload: user })
    })
  },
  // Create new User
  create: async (req, res) => {
      const { name, email, password } = req.body
    
      try {
        const newUser = new User ({ name, email, password })
        await newUser.save()
        res.send(newUser)
      } catch (err) {
        console.error(err)
        res.status(500).send(err)
      }
    
    // // User.create(req.body, (err, newUser) => {
    // //   if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
    // //   // const token = signToken(newUser)
    // //   res.json({ message: `SUCCESS created newUser: ${newUser}`})
    // // })

    // const { name, email, password } = req.body
    // console.log('req.body:')
    // console.log(req.body)
    
    // const newUser = new User({
    //   name: name,
    //   email: email,
    //   password: password,
    // })
    // console.log('newUser')
    // console.log(newUser)
    // newUser.save()
    //   .then(() => console.log(`SUCCESS! Created new User! res: ${res}`))
    //   .catch((err) => console.log(`Error! Res: ${res} | Error: ${err}`))
  },
  // Edit User
  update: (req, res) => {
    User.findById(req.params.id, (err, updatedUser) => {
      if (!req.body.password) delete req.body.password
      Object.assign(updatedUser, req.body)
      updatedUser.save((err, updatedUser) => {
        if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
        res.json({ message: `SUCCESS profile is updated`, payload: updatedUser })
      })
    })
  },
  // Delete User
  destroy: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser ) => {
      if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
      res.json({ message: `SUCCESS ${deletedUser} has been deleted.`, payload: deletedUser })
    })
  }
  // Authenticate TBD
}
