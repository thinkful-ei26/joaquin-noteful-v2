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
    .modify(function(queryBuilder) {
      if (folderId) {
        queryBuilder.where('folder_id', folderId);
      }
    })
    .orderBy('notes.id')
    .then(results => res.json(results));
});
//  .catch(err => next(err));

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')
    .select('notes.id', 'title', 'content', 'folder_id', 'folders.name')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .where({ 'notes.id': id })
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  /***** Never trust users - validate input *****/
  const notesId = req.params.id;
  const { title, content, folderId } = req.body; //updateable fields

  // const updateObj = {};
  // const updateableFields = ['title', 'content'];

  // updateableFields.forEach(field => {
  //   if (field in req.body) {
  //     updateObj[field] = req.body[field];
  //   }
  // });

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  const updateNotes = {
    title,
    content,
    folder_id: folderId ? folderId : null
  };

  knex
    .from('notes')
    .update(updateNotes)
    .where('id', `${notesId}`)
    .returning([id])
    .then(() => {
      // Using the noteId, select the note and the folder info
      return knex
        .select(
          'notes.id',
          'title',
          'content',
          'folder_id as folderId',
          'folders.name as folderName'
        )
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', notesId);
    })
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body;

  const newItem = {
    title,
    content,
    folder_id: (folderId) ? folderId : null
  };
  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  knex
    .insert(newItem)
    .into('notes')
    .returning('id')
    .then(([id]) => {
      //array destructuring
      // notesId = id;
      // Using the new id, select the new note and the folder
      return knex
        .select(
          'notes.id',
          'title',
          'content',
          'folder_id as folderId',
          'folders.name as folderName'
        )
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', id);
    })
    .then(([result]) => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => next(err));
});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('notes')
    .where('id', id)
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
