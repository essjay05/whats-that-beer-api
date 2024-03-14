const
  express = require('express'),
  UserModel = require ('../models/Users.js'),
  usersRouter = new express.Router(),
  { client } = require('../db.js'),
  myDb = client.db('whats-that-beer-db'),
  usersColl = myDb.collection('users'),
  usersCtrl = require('../controllers/users.js')
  // Token for authentication

// Create New User
usersRouter.post('/signup', usersCtrl.create)

// Find 1 user
usersRouter.get('/:id', usersCtrl.show)

// Update User
usersRouter.patch('/:id', usersCtrl.update)

// usersRouter.get('/', usersCtrl.index)
// usersRouter.post('/', usersCtrl.create)
// // usersRouter.post('/authenticate', usersCtrl.authenticate)

// // usersRouter.use(verifyToken)
// usersRouter.get('/:id', usersCtrl.show)
// usersRouter.patch('/:id', usersCtrl.update)
// usersRouter.delete('/:id', usersCtrl.destroy)

module.exports = usersRouter