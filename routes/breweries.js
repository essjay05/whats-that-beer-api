const
  express = require('express'),
  breweriesRouter = new express.Router(),
  breweriesCtrl = require('../controllers/breweryController.js')
  // verifyToken = require('../serverAuth')

// breweriesRouter.use()

// INDEX (Find all)
breweriesRouter.get('/', breweriesCtrl.index)

// CREATE
breweriesRouter.post('/', breweriesCtrl.create)

// CREATE MANY
// breweriesRouter.post('/multiple/', breweriesCtrl.createMany)

// SHOW (Find one by id)
breweriesRouter.get('/:id', breweriesCtrl.show)

// UPDATE / Like
// breweriesRouter.patch('/:id', breweriesCtrl.updateOne)

// UPSERT / Update if exists otherwise insert new
// breweriesRouter.put('/:name', breweriesCtrl.upsert)

// DELETE
// breweriesRouter.delete('/:id', breweriesCtrl.destroy)

module.exports = breweriesRouter