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

// SHOW (Find one by id)
beersRouter.get('/:id', beersCtrl.show)

// SEARCH (Find matching abv provided)
beersRouter.get('/search/:abv', beersCtrl.searchByAbv)

// UPDATE / Like
beersRouter.patch('/:id', beersCtrl.updateOne)

// UPSERT / Update if exists otherwise insert new
beersRouter.put('/:name', beersCtrl.upsert)

// DELETE
beersRouter.delete('/:id', beersCtrl.destroy)

module.exports = beersRouter