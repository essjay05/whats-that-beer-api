const
  express = require('express'),
  User = require ('../models/User.js'),
  usersRouter = new express.Router()
  // usersCtrl = require('../controllers/users.js')
  // Token for authentication

// Create New User
usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const newUser = new User({ name, email, password })
    console.log(`newUser: ${newUser}`)
    await newUser.save()
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