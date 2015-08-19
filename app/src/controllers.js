// Define the Controllers for the App
// ----------------------------------
//
// All of the controller used in the app are defined here.

'use strict';

angular.module('foositControllers', [])
  .controller('NavController', ['$scope', '$location', function($scope, $location) {
    
    // Change which tab is active on the nav bar based on which view is currently being displayed
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }])
  .controller('LeaderboardCtrl', ['$scope', 'LeaderboardService', function LeaderboardCtrl($scope, LeaderboardService) {
    
    $scope.playerList = [];

    // Get the player data from the server when the view loads
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

    // Default ordering of the records is by date
    // This can be changed by the user
    $scope.order = 'date';

    // Get the latest match data from the server
    function refreshMatchList() {
      MatchService.getMatches()
        .then(function(matches) {
          $scope.matchList = matches.data;
        })
        .catch(function(err) {
          console.error('Error in getting matches:', err);
        });
    }

    $scope.addNewMatch = function() {

      // Pull input field data to create new match
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

          // Reset input fields
          $scope.newDate = '';
          $scope.newWinner = '';
          $scope.newScoreW = '';
          $scope.newLoser = '';
          $scope.newScoreL = '';

          // Get updated match list from server
          refreshMatchList();
        })
    };

    // Change which column determines the ordering of the match records
    $scope.setOrder = function(order) {
      $scope.order = order;
    };

    // Populate $scope with latest match list on controller load
    refreshMatchList();

  }])
  .controller('GraphCtrl', ['$scope', 'GraphService', function GraphCtrl($scope, GraphService) {

    // Get the graph data from the server when the view loads
    GraphService.getData()
      .then(function(data) {
        $scope.data = data.data;
      })
  }]);