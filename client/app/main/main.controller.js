'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.awesomeProblems = [];

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/problems').then(response => {
      this.awesomeProblems = response.data;
      socket.syncUpdates('problem', this.awesomeProblems);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('problem');
    });
  }

  addProblem(name, info) {
    if (this.newProblem) {
      this.$http.post('/api/problems', { name: name, info: info });
      this.newProblem = '';
    }
  }

  deleteProblem(problem) {
    this.$http.delete('/api/problems/' + problem._id);
  }
}


angular.module('codeDojoApp')
  .controller('MainController', MainController);

})();
