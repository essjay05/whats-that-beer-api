const express = require('express')
const usersRouter = new express.Router()
const usersCtrl = require('../controllers/userController.js')
const authCtrl = require('../controllers/authController.js')

// Create New User
usersRouter.post('/signup', authCtrl.create)

// Login User
usersRouter.post('/signin', authCtrl.login)

// Find 1 user
usersRouter.get('/:id', usersCtrl.show)

// Update User
usersRouter.patch('/:id', authCtrl.update)

// See all users
usersRouter.get('/', usersCtrl.index)
// // usersRouter.post('/authenticate', usersCtrl.authenticate)

// // usersRouter.use(verifyToken)

usersRouter.delete('/:id', usersCtrl.destroy)

module.exports = usersRouter