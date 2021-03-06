'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockDogApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
      //template: '<div></div>',
      // [1] Use as element attribute and require stkStockTable controller
      restrict: 'A',
      require: '^stkStockTable', //It needs this specific controller
      scope: {
        stock: '=',
        isLast: '='
      },
      // [2] The required controller will be made available at the end
      link: function postLink($scope, $element, $attrs, stockTableCtrl) {
        // [3] Create tooltip for stock-row
        $element.tooltip({
          placement: 'left',
          title: $scope.stock.company.name
        });

        // [4] Add this row to the TableCtrl
        stockTableCtrl.addRow($scope);

        // [5] Register this stock with the QuoteService
        QuoteService.register($scope.stock);

        // [6] Deregister company with the QuoteService on $destroy
        $scope.$on('$destroy', function(){
          stockTableCtrl.removeRow($scope);
          QuoteService.deregister($scope.stock);
        });

        // [7] If this is the last 'stock-row', fetch quotes inmmediately
        if($scope.isLast) {
          $timeout(QuoteService.fetch);
        }

        // [8] Watch for changes in shares and recalculate fields
        $scope.$watch('stock.shares', function(){
          $scope.stock.marketValue = $scope.stock.shares *
            $scope.stock.lastPrice;
          $scope.stock.dayChange = $scope.stock.shares *
            parseFloat($scope.stock.change);
            $scope.stock.save();
        });

        //element.text('this is the stkStockRow directive');
      }
    };
  });
