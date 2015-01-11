var mongoose = require('mongoose');
var logger = require('./logger');

module.exports.class = function() {
  var db, studentSchema;

  mongoose.connect('mongodb://localhost/students');

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    logger.info('db connection open');
  });

  this.connection = db;

  // Student
  studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
  });

  this.student = mongoose.model('Student', studentSchema);
};