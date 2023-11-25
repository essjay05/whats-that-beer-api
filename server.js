const express = require('express')

const PORT = 3030

const app = express()

// Middleware
app.use(express.json())

// Temporary Database
const database = {
  users: [
    {
      id: '123',
      username: 'testuser123',
      email: 'testuser123@gmail.com',
      password: 'cookies', 
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      username: 'user124',
      email: 'user123@gmail.com',
      password: 'bananas', 
      entries: 0,
      joined: new Date()
    },
  ]
}

// Routes
// Home
app.get('/', (req, res) => {
  res.json(database.users)
})

// Signin
app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.status(200).json('Successfully signed in')
  } else {
    res.status(400).json('error logging in')
  }
})

// Register
app.post('/register', (req, res) => {
  const { username, email, password } = req.body
  database.users.push({
    id: '125',
    username: username,
    email: email,
    password: password, 
    entries: 0,
    joined: new Date()
  })
  database.push
  res.json(database.users[database.users.length-1])
})

// User profile
app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach( user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('User not found')
  }
})

// Update image
app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach( user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('User not found')
  }
})

app.listen(PORT, () => {
  console.log(`App Server is listening on PORT:${PORT}`)
})

/*
// General Route Planning
  / --> res = this is working
  /signin --> POST = success/fail
  /register --> POST = user
  /profile/:userId --> GET = user
  /image --> PUT --> user
*/