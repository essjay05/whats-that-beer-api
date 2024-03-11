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

// Login user
usersRouter.post('/login', async (req, res) => {
  const doc = req.body

  try {
    // const newUser = new User({ name, email, password })
    // console.log(`newUser: ${newUser}`)
    // await newUser.save()
    const result = await usersColl.insertOne(doc)
    res.send({
      message: `Success! New User created.`
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// usersRouter.get('/', usersCtrl.index)
// usersRouter.post('/', usersCtrl.create)
// // usersRouter.post('/authenticate', usersCtrl.authenticate)

// // usersRouter.use(verifyToken)
// usersRouter.get('/:id', usersCtrl.show)
// usersRouter.patch('/:id', usersCtrl.update)
// usersRouter.delete('/:id', usersCtrl.destroy)

module.exports = usersRouter