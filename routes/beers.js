const
  express = require('express'),
  beersRouter = new express.Router(),
  beersCtrl = require('../controllers/beers.js')
  // verifyToken = require('../serverAuth')

// beersRouter.use()

// INDEX (Find all)
beersRouter.get('/', beersCtrl.index)

// CREATE
beersRouter.post('/', beersCtrl.create)

// CREATE MANY
beersRouter.post('/multiple/', beersCtrl.createMany)

// SHOW (Find one)
beersRouter.get('/:id', beersCtrl.show)

// SEARCH (Find matching name provided)
beersRouter.get('/search/:abv', beersCtrl.searchByAbv)

// UPDATE / Like
beersRouter.patch('/:id', beersCtrl.update)

// DELETE
beersRouter.delete('/:id', beersCtrl.destroy)

module.exports = beersRouter