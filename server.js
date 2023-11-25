const express = require('express')

const PORT = 3030

const app = express()

// Routes
// Home
app.get('/', (req, res) => {
  res.send('This is working')
})

// Signin
app.post('/signin', (req, res) => {
  res.send('Signing in')
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