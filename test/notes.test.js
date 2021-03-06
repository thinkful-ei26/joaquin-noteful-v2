'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../server');
const { TEST_MONGODB_URI } = require('../config');

const Note = require('../models/note');

const { notes } = require('../db/seed/notes'); //What is this?

const expect = chai.expect;
chai.use(chaiHttp);



//Mocha hooks
describe('reality check',

before(function() {
  return mongoose
    .connect(TEST_MONGODB_URI)
    .then(() => mongoose.connection.db.dropDatabase());
});

beforeEach(function() {
  return Note.insertMany(notes);
});

afterEach(function() {
  return mongoose.connection.db.dropDatabase();
});

after(function() {
  return mongoose.disconnect();
});
);