'use strict';

angular.module('foositApp', ['ngRoute', 'foositControllers', 'foositServices'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(false).hashPrefix('!');
  }]);
