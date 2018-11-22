'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();
//this is the query that will be used in GET /notes. Get All Notes accepts a searchTerm and finds notes with titles which contain the term. It returns an array of objects.
// let searchTerm = 'New';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// //Get Note By Id accepts an ID. It returns the note as an object not an array
// const id = '4'; //make sure that whatever id you test with, actually exists in the database!
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .where('notes.id', id)
//   .returning(['title', 'content', 'id'])
//   .then(result => {
//     console.log(JSON.stringify(result[0]));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// // Update Note By Id accepts an ID and an object with the desired updates. It returns the updated note as an object. Again, make sure the frickin ID exists!!!!!!How do i make it not specific to an id?

// const otherid = 8;
// const updObj = { title: 'NEW PUT 008',content: 'PUT 008' };
// knex
//   .from('notes')
//   .update(updObj)
//   .where('id', `${otherid}`)
//   .returning('*')
//   .then(result => {
//     console.log('the result is ', result);
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// //Create a Note accepts an object with the note properties and inserts it in the DB. It returns the new note (including the new id) as an object.

// const newObj = { title: 'New Title', content: 'Hanga Banga Boo' };
// knex
//   .insert(newObj)
//   .into('notes')
//   .returning(['title', 'content', 'id'])
//   .then(result => {
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => {
//     console.log(err);
//   });

// // Delete Note By Id accepts an ID and deletes the note from the DB.
// const idagain = '5';
// knex
//   .from('notes')
//   .where('id', `${idagain}`)
//   .del()
//   .then(result => {
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => {
//     console.error(err);
//   });
