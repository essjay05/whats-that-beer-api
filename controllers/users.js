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
  create: (req, res) => {
    // User.create(req.body, (err, newUser) => {
    //   if (err) res.json({ message: 'ERROR', payload: null, code: err.code })
    //   // const token = signToken(newUser)
    //   res.json({ message: `SUCCESS created newUser: ${newUser}`})
    // })

    const { name, email, password } = req.body
    console.log(req.body)

    try {
      const newUser = new User.create({
        name: name,
        email: email,
        password: password,
      })
      newUser.save()
      return res.json({
        message: `SUCCESS! Created ${newUser.name} profile successfully!`
      })
    } catch (err) {
      res.json({
        message: `ERROR! Data not saved.`,
        error: err,
        response: res
      })
    }
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
