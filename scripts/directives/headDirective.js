'use strict';
angular.module('admingarageApp')
   .directive('siteHead', function (Auth) {
    return {
      
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        template: '<ng-include src="getTemplateUrl()"/>',
        controller: function($scope) {
            //function used on the ng-include to resolve the template
            $scope.getTemplateUrl = function() {
              //basic handling
              console.log(Auth);
              if(Auth.$getAuth()){
                return 'views/includes/head.html';
                }

            };
        }
  
         
        
    };
});
