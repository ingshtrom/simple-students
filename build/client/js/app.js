/* global _ */
var app = angular.module('SimpleStudents', ['ngMaterial']);

app.service('studentService',
  function($http, $q) {
    var handleError = function(response) {
      if (!angular.isObject(response.data) || !response.data.message) {
        return($q.reject('An unknown error occurred.'));
      }
      return($q.reject(response.data.message));
    };

    var handleSuccess = function(response) {
      return(response.data);
    };

    var getStudents = function() {
      var request = $http({
        method: 'get',
        url: '/students'
      });

      return(request.then(handleSuccess, handleError));
    };

    /**
     *
     * @param {[Object]} student  - object with keys 'firstName', 'lastName', and 'email'
     * @returns {[Object]}        - object with keys 'firstName', 'lastName', 'email', and 'id'
     */
    var addStudent = function(student) {
      var request = $http({
        method: 'post',
        url: '/students',
        data: student
      });

      return(request.then(handleSuccess, handleError));
    };

    /**
     *
     * @param {[Object]} student  - object with keys 'firstName', 'lastName', and 'email'
     * @returns {[Object]}        - object with keys 'firstName', 'lastName', 'email', and 'id'
     */
    var updateStudent = function(student) {
      var request = $http({
        method: 'put',
        url: '/student/' + student._id,
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        }
      });

      return(request.then(handleSuccess, handleError));
    };

    var removeStudent = function(studentId) {
      var request = $http({
        method: 'delete',
        url: '/student/' + studentId
      });

      return request.then(handleSuccess, handleError);
    };

    return({
      addStudent: addStudent,
      getStudents: getStudents,
      updateStudent: updateStudent,
      removeStudent: removeStudent
    });
  }
);

app.controller('StudentListController', [
  '$scope',
  '$mdToast',
  'studentService',
  function ($scope, $mdToast, studentService) {
    /**
     * {
     *   _id: String,
     *   email: String,
     *   firstName: String,
     *   lastName: String,
     *   editEnabled: bool,
     *   saveFunc: function
     * }
     */
    $scope.students = [];
    $scope.cachedStudent = {};
    $scope.inCreateMode = false;

    var showSuccessToast = function(message) {
      $mdToast.show({
        controller: 'ToastController',
        templateUrl: '/templates/success-toast-template.html',
        hideDelay: 3000,
        position: 'top left',
        locals: {
          message: message
        }
      });
    };

    var showFailureToast = function(message) {
      $mdToast.show({
        controller: 'ToastController',
        templateUrl: '/templates/failure-toast-template.html',
        hideDelay: 3000,
        position: 'top left',
        locals: {
          message: message
        }
      });
    };

    // TODO: Deprecate
    var getStudentScopeIndex = function(id) {
      return _.findIndex($scope.students, function(student) {
        return student._id === id;
      });
    };

    var getStudentInScope = function(id) {
      var index = _.findIndex($scope.students, function(student) {
        return student._id === id;
      });
      return $scope.students[index];
    };

    var updateStudent = function(student) {
      studentService.updateStudent({
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      })
      .then(function() {
        var s = getStudentInScope(student._id);
        s.editEnabled = false;
        showSuccessToast('Successfully saved student: ' + student.lastName + ', ' + student.firstName);
      })
      .catch(function(err) {
        showFailureToast(err);
      });
    };

    var createStudent = function(student) {
      // TODO: display alert
      studentService.addStudent({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      })
      .then(function(result) {
        if (!result || !result._id) {
          // TODO: display error alert
        }
        // find the student with id='no_id_yet' and set the id
        var index = _.findIndex($scope.students, function(s) {
          return s.id === 'no_id_yet';
        });
        $scope.students[index]._id = result._id;
        $scope.students[index].editEnabled = false;
        delete $scope.students[index].id;
        showSuccessToast('Successfully saved student: ' + student.lastName + ', ' + student.firstName);
      })
      .catch(function(err) {
        showFailureToast(err);
      });
    };

    $scope.addStudent = function() {
      if ($scope.inCreateMode) {
        return;
      }

      // stop editing all other students
      $scope.students = _.each($scope.students, function(student) {
        student.editEnabled = false;
        student.saveFunc = updateStudent;
      });

      $scope.inCreateMode = true;
      $scope.students.push({
        id: 'no_id_yet',
        editEnabled: true,
        saveFunc: function(args) {
          $scope.inCreateMode = false;
          createStudent(args);
        }
      });
      // scroll to the bottom where the new card was added
      $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
    };

    $scope.saveStudent = function(student) {
      student.saveFunc(student);
    };

    $scope.removeStudent = function(student) {
      var cb = function() {
        studentService.removeStudent(student._id)
        .then(function() {
          _.remove($scope.students, function(s) {
            return s._id === student._id;
          });
        })
        .catch(function() {
          showFailureToast('Failed to delete student.');
        });
      };
      $mdToast.show({
        controller: 'ConfirmToastController',
        templateUrl: '/templates/confirm-delete-toast-template.html',
        hideDelay: 60000,
        position: 'top left',
        locals: {
          lastName: student.lastName,
          firstName: student.firstName,
          removeStudentFunc: cb
        }
      });
    };

    $scope.cancelEdit = function(student) {
      console.log('cancelEdit', {
        student: student,
        cachedStudent: $scope.cachedStudent
      });
      if ($scope.inCreateMode) {
        $scope.inCreateMode = false;
        $scope.students.pop();
        return;
      }
      var index = getStudentScopeIndex(student._id);
      $scope.students[index] = $scope.cachedStudent;
    };

    $scope.editStudent = function(id) {
      var student = getStudentInScope(id);
      $scope.cachedStudent = _.clone(student, true);  // cache this so we can revert
      student.editEnabled = true;
      student.saveFunc = updateStudent;
    };

    studentService.getStudents()
    .then(function(students) {
      $scope.students = _.map(students, function(student) {
        var cur = student;
        cur.editEnabled = false;
        cur.saveFunc = updateStudent;
        return cur;
      });
    });
  }
]);

app.controller('ToastController', [
  '$scope',
  '$mdToast',
  'message',
  function($scope, $mdToast, message) {
    $scope.message = message;
    $scope.closeToast = function() {
      $mdToast.hide();
    };
  }
]);

app.controller('ConfirmToastController', [
  '$scope',
  '$mdToast',
  'lastName',
  'firstName',
  'removeStudentFunc',
  function($scope, $mdToast, lastName, firstName, removeStudentFunc) {
    $scope.lastName = lastName;
    $scope.firstName = firstName;
    $scope.closeToast = function() {
      $mdToast.hide();
    };
    $scope.removeStudent = function() {
      removeStudentFunc();
      console.log('foo', {
        func: removeStudentFunc
      });
      $mdToast.hide();
    };
  }
]);