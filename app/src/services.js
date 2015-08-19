// Define the Services for the App
// -------------------------------
//
// All of the services used in the app are defined here.

'use strict';

angular.module('foositServices', [])
  .service('LeaderboardService', ['$http', function($http) {
    this.getPlayers = function() {
      return $http.get('/api/player');
    };
  }])
  .service('MatchService', ['$http', function($http) {
    this.getMatches = function() {
      return $http.get('/api/match');
    };

    this.addMatch = function(match) {
      return $http.post('/api/match/add', match);
    }
  }])
  .service('GraphService', ['$http', function($http) {
    this.getData = function() {
      return $http.get('/api/wincount');
    };
  }]);
  