'use strict';

angular.module('foositControllers', [])
  .controller('LeaderboardCtrl', ['$scope', 'LeaderboardService', function LeaderboardCtrl($scope, LeaderboardService) {
    
    $scope.playerList = [];

    LeaderboardService.getPlayers()
      .then(function(players){
        console.log('players:', players);
        $scope.playerList = players.data;
      })
      .catch(function(err) {
        console.error('Error in getting players:', err);
      });

  }]);