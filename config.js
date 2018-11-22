'use strict';

exports.PORT = process.env.PORT || 8080;

TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/noteful-test';//should the last bit here be notes.test.js?