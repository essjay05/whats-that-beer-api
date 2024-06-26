require('dotenv').config()

const 
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  // bcrypt = require('bcrypt'),
  PORT = process.env.PORT || 3030,
  { client, myMongoDb, connectToMongoDb } = require('./db.js'),
  UserModel = require('./models/User.js'),
  usersRoutes = require('./routes/users.js'),
  breweriesRoutes = require('./routes/breweries.js'),
  beersRoutes = require('./routes/beers.js'),
  path = require('path')

// connectToMongoDb().catch(console.dir);
connectToMongoDb().catch(console.error)

// console.log(myMongoDb)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

// Set API specific root
app.get('/api', (req, res) => {
  res.json({ message: 'API ROOT' })
})

// API Routes
app.use('/api/users', usersRoutes)
app.use('/api/breweries', breweriesRoutes)
app.use('/api/beers', beersRoutes)

// Routes
// Home
app.get('/', (req, res) => {
  res.json(database.users)
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

// // Hashing passwords logic
// bcrypt.hash('aloha', null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

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