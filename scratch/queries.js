'use strict';

const knex = require('../knex');

let searchTerm = 'Baz';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .where('notes.id', 'id')
  .then(results => console.log(JSON.stringify(results[0])));
