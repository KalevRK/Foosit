'use strict';

angular.module('foositControllers', [])
  .controller('LeaderboardCtrl', ['$scope', 'LeaderboardService', function LeaderboardCtrl($scope, LeaderboardService) {
    
    $scope.playerList = [];

    LeaderboardService.getPlayers()
      .then(function(players) {
        $scope.playerList = players.data;
      })
      .catch(function(err) {
        console.error('Error in getting players:', err);
      });

  }])
  .controller('MatchCtrl', ['$scope', 'MatchService', function MatchCtrl($scope, MatchService) {
    
    $scope.matchList = [];

    MatchService.getMatches()
      .then(function(matches) {
        $scope.matchList = matches.data;
      })
      .catch(function(err) {
        console.error('Error in getting matches:', err);
      });

  }]);