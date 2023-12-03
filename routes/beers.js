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

// SHOW (Find one)
beersRouter.get('/:id', beersCtrl.show)

// UPDATE / Like
beersRouter.patch('/:id', beersCtrl.update)

// DELETE
beersRouter.delete('/:id', beersCtrl.destroy)

module.exports = beersRouter