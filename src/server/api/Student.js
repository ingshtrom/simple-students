var Joi = require('joi');
var _ = require('lodash');

var Student = function(options) {
  this.model = options.database.student;
};

var _findStudentValidator = function(err, students, studentId) {
  if (err || !students) {
    return 'Could not find a student with _id: ' + studentId;
  }
  if (students.length !== 1) {
    return students.length + ' students found with _id: ' + studentId;
  }
  return undefined;
};

Student.prototype.buildConfigs = function() {
  var self = this;
  return {
    createStudent: {
      handler: function(request, reply) {
        var body = request.payload;
        var s = new self.model();

        s.firstName = body.firstName;
        s.lastName = body.lastName;
        s.email = body.email;
        s.save(function(err, data) {
          if (err) {
            reply(new Error('error saving student'));
          }
          reply(data.toJSON());
        });
      },
      validate: {
        payload: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email().required()
        }
      }
    },
    getStudent: {
      handler: function(request, reply) {
        var studentId = request.params.id;
        self.model.find({
          _id: studentId
        }, function(err, students) {
          var errMessage = _findStudentValidator(err, students, studentId);
          if (!!errMessage) {
            reply(new Error(errMessage));
            return;
          }
          reply(students[0].toJSON());
        });
      },
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    getAllStudents: {
      handler: function(request, reply) {
        self.model.find({}, function(err, students) {
          if (err) {
            throw new Error('n error ocurred while searching for students: ' + err);
          }
          var studentsFound = [];
          _.each(students, function(student) {
            studentsFound.push(student.toJSON());
          });
          reply(studentsFound);
        });
      }
    },
    updateStudent: {
      handler: function(request, reply) {
        var studentId = request.params.id;
        var query = {_id: studentId};
        var options = {multi: false};
        var updateDoc = {};
        if (!!request.payload.firstName) {
          updateDoc.firstName = request.payload.firstName;
        }
        if (!!request.payload.lastName) {
          updateDoc.lastName = request.payload.lastName;
        }
        if (!!request.payload.email) {
          updateDoc.email = request.payload.email;
        }

        if (updateDoc === {}) {
          reply('No updates to make.');
        }

        self.model.update(query, updateDoc, options, function(err) {
          if (err) {
            reply(new Error('Error while updating student with _id: ' + studentId));
            return;
          }
          self.model.find(query, function(err, students) {
            var errMessage = _findStudentValidator(err, students, studentId);
            if (!!errMessage) {
              reply(new Error(errMessage));
              return;
            }
            reply(students[0].toJSON());
          });
        });
      },
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string().email()
        }
      }
    },
    deleteStudent: {
      handler: function(request, reply) {
        var studentId = request.params.id;
        self.model.remove({
          _id: studentId
        }, function(err) {
          if (err) {
            reply(new Error('Could not delete student with _id: ' + studentId));
            return;
          }
          reply();
        });
      },
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  };
};

module.exports.class = Student;