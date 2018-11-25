'use strict';

const express = require('express');
const knex = require('../knex');

// Create an router instance (aka "mini-app")
const router = express.Router();
//GET all
router.get('/', (req, res, next) => {
  knex
    .select('folders.id', 'folders.name')
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
    .select('id', 'name')
    .from('folders')
    .where({ 'folders.id': id })
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  // const updateObj = {};
  // const updateableFields = ['name'];
  const { name } = req.body;

  // updateableFields.forEach(field => {
  //   if (field in req.body) {
  //     updateObj[field] = req.body[field];
  //   }
  // });

  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  const updateName = { name };

  knex
    .from('folders')
    .update(updateName)
    .where('id', id)
    .returning('*')
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/*********POST */
router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  knex
    .insert(newItem)
    .into('folders')
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result) {
        // res.location(`http://${req.headers.host}/folders/${result.id}`).status(201).json(result);
        res
          .location(`${req.originalUrl}/${result.id}`)
          .status(201)
          .json(result);
      }
    })
    .catch(err => {
      next(err);
    });
});

/***********DELETE */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('folders')
    .where('id', id)
    .del()
    .then(() => res.sendStatus(204))
    .catch(err => {
      next(err);
    });
});

module.exports = router;
