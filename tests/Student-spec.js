var Student = require('../build/server/api/Student').class;
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Student routes', function() {
  var studentModel = null
  var studentRoutes = null

  beforeEach(function(done) {
    studentModel = Object.create(null);
    studentRoutes = new Student({
      database: {
        student: studentModel
      }
    });
  });

  describe(' - createStudent handler', function() {
    it('should reply with an error when the save fails', function(done) {

    });
    it ('should reply with the student JSON when the save succeeds', function(done) {

    });
  });
  describe(' - getStudent handler', function() {
    it('should reply with an error when the find fails', function(done) {

    });
    it ('should reply with the student JSON when the find succeeds', function(done) {

    });
  });
  describe(' - updateHandler handler', function() {
    it('should reply with an error when the update fails', function(done) {

    });
    it ('should reply with the student JSON when the update succeeds', function(done) {

    });
  });
  describe(' - deleteStudent handler', function() {
    it('should reply with an error when the remove fails', function(done) {

    });
    it ('should reply with the student JSON when the remove succeeds', function(done) {

    });
  });
});