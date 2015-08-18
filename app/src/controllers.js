'use strict';

angular.module('foositControllers', [])
  .controller('NavController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }])
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
    $scope.order = 'date';

    function refreshMatchList() {
      MatchService.getMatches()
        .then(function(matches) {
          $scope.matchList = matches.data;
        })
        .catch(function(err) {
          console.error('Error in getting matches:', err);
        });

    $scope.addNewMatch = function() {
      var newMatch = {
        date: $scope.newDate,
        winner: $scope.newWinner,
        winnerScore: $scope.newScoreW,
        loser: $scope.newLoser,
        loserScore: $scope.newScoreL
      };

      MatchService.addMatch(newMatch)
        .then(function() {
          console.log('Match added successfully');
          refreshMatchList();
        })
    };

    $scope.setOrder = function(order) {
      $scope.order = order;
    };

    }

    // Populate $scope with latest match list on controller load
    refreshMatchList();

  }]);