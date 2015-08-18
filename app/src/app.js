'use strict';

angular.module('foositApp', ['ngRoute', 'foositControllers', 'foositServices', 'foositDirectives', 'd3'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })
      .when('/matches', {
        templateUrl: 'partials/matches.html',
        controller: 'MatchCtrl'
      })
      .when('/graph', {
        templateUrl: 'partials/graph.html',
        controller: 'GraphCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(false).hashPrefix('!');
  }]);
