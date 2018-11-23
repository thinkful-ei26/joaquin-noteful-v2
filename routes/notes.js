'use strict';

const express = require('express');
const knex = require('../knex');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  const { folderId } = req.query;

  knex
    .select('notes.id', 'title', 'folders.id', 'folders.name')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .modify(queryBuilder => {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .modify(function(queryBuilder){
      if(folderId) {
        queryBuilder.where('folder_id',folderId);
      }
    })
    .orderBy('notes.id')
    .then(results => res.json(results));
});
//  .catch(err => next(err));

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('notes.id', 'title', 'content')
    .from('notes')
    .where({ 'notes.id': id })
    .then(results => res.json(results[0]));
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

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
    .update(updateObj)
    .where('id', `${id}`)
    // .returning(id)
    .then(result => {
      res.json(result);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  knex
    .insert([{ title: title, ' content': content }])
    .into('notes')
    .then(result => res.json(result));
});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex
    .del()
    .from('notes')
    .where('id', id)
    .then(() => res.sendStatus(204));
});

module.exports = router;
