'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockDogApp')
  .directive('stkSignColor', function () {
    return {
      //template: '<div></div>',
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {

        // [1] Use $observe to watch expression for changes
        /*$observe can only be used to observe/watch the value change
        of a DOM attribute*/
        $attrs.$observe('stkSignColor', function(newVal){
          var newSign = parseFloat(newVal);
          //[2] Set element's style.color value depending on sign
          if(newSign > 0){
            $element[0].style.color = 'Green';
          } else {
            $element[0].style.color = 'Red';
          }
        });

        //element.text('this is the stkSignColor directive');
      }
    };
  });
