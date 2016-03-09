'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {

    // [1] Populate watchlists for dynamic nav links
    $scope.watchlists = WatchlistService.query();

    // [2] Using $location.path() function as a $watch expression
    $scope.$watch(function(){
      return $location.path;
    }, function(path){
      //_.includes instead of _.contains.
      //https://github.com/angular-ui/angular-google-maps/issues/1682
      if(_.includes(path, 'watchlist')){
        $scope.activeView = 'watchlist';
      } else {
        $scope.activeView = 'dashboard';
      }
    });
  });
