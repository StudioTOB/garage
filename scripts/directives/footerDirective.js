'use strict';
angular.module('admingarageApp')
   .directive('siteFooter', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: '../views/includes/footer.html'
    };
});

