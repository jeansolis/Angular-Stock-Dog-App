'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockTable
 * @description
 * # stkStockTable
 */
angular.module('stockDogApp')
  .directive('stkStockTable', function () {
    return {
      templateUrl: 'views/templates/stock-table.html',
      restrict: 'E',
      //[1] Isolate scope
      scope: {
        watchlist: '='
      },
      //[2] Create a controller that serves as an API for this directive
      /*This is how you expose an API for other directives to use for
      communication.*/
      controller: function($scope){
        var rows = [];

        $scope.$watch('showPercent', function(showPercent){
          if(showPercent){
            _.each(rows, function(row){
              row.showPercent = showPercent;
            });
          }
        });

        this.addRow = function(row){
          rows.push(row);
        };

        this.removeRow = function(row){
          _.remove(rows, row);
        };
      },
      // [3] Standard link function implementation (For DOM manipulation)
      link: function($scope){
        //Initialize the showPercent scope
        $scope.showPercent = false;
        //Expose removeStock function via the top-level directive scope.
        $scope.removeStock = function(stock){
          $scope.watchlist.removeStock(stock);
        };
      }
      /*link: function postLink(scope, element, attrs) {
        element.text('this is the stkStockTable directive');
      }*/
    };
  });
