require('dotenv').config()

const 
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  bcrypt = require('bcrypt-nodejs'),
  PORT = process.env.PORT || 3030,
  { client, myMongoDb, connectToMongoDb } = require('./db.js'),
  usersRoutes = require('./routes/users.js'),
  beersRoutes = require('./routes/beers.js'),
  path = require('path')

var corsOptions  = {
  origin: `http://localhost:${PORT}`
}

// connectToMongoDb().catch(console.dir);
connectToMongoDb().catch(console.error)

// console.log(myMongoDb)

const app = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set API specific root
app.get('/api', (req, res) => {
  res.json({ message: 'API ROOT' })
})

// API Routes
app.use('/api/users', usersRoutes)
app.use('/api/beers', beersRoutes)

// Routes
// Home
app.get('/', (req, res) => {
  res.json(database.users)
})

// Signin
app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare('apples', '$2a$10$c4iMGUnqh3y0.EIRPWXePOr3SW7i6HXG4OZ6BI5U1fRwjl4/XV8gG', function(err, res) {
    // res == true
    console.log('First guess', res)
  });
  bcrypt.compare('seeya', '$2a$10$c4iMGUnqh3y0.EIRPWXePOr3SW7i6HXG4OZ6BI5U1fRwjl4/XV8gG', function(err, res) {
    // res = false
    console.log('Second guess', res)
});
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
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash)
  });
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

// Hashing passwords logic
bcrypt.hash('aloha', null, null, function(err, hash) {
  // Store hash in your password DB.
});

// // Load hash from your password DB.
// bcrypt.compare('aloha', hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare('seeya', hash, function(err, res) {
//     // res = false
// });

app.listen(PORT, () => {
  console.log(`App Server is listening on PORT:${PORT}`)
})

module.exports = client