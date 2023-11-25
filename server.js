const express = require('express')

const PORT = 3030

const app = express()

app.listen(PORT, () => {
  console.log(`App Server is listening on PORT:${PORT}`)
})