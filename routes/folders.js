'use strict';

const express = require('express');
const knex = require('../knex');

// Create an router instance (aka "mini-app")
const router = express.Router();
//GET all
router.get('/', (req, res, next) => {
  knex.select('folders.id', 'folders.name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('folders.id', 'folders.name')
    .from('folders')
    .where({ 'folders.id': id })
    .then(results => res.json(results[0]));
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .from('notes')
    .where('id', id)
    .update({
      title: updateObj.title,
      content: updateObj.content
    })
    .returning(updateObj)
    .then(console.log);
});


module.exports = router;