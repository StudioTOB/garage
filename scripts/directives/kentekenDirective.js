'use strict';
angular.module('admingarageApp')
.directive('kenteken', function ($firebaseObject) {
    return {
        scope: {
            klantid: '@',
            kentekenid:'@'
        },
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        link:function(scope,elements,attributes){
            
        

            scope.klantId = attributes.klantid;
            scope.kentekenId = attributes.kentekenid;
            
            var refkenteken = new Firebase('https://garageapp.firebaseio.com/voertuigen/');
            var klantRef = refkenteken.child(scope.klantId);
            var kentekenRef = klantRef.child(scope.kentekenId);
            scope.getkenteken = $firebaseObject(kentekenRef);
            scope.getkenteken.$loaded(function(){
             scope.kentekenplaat = scope.getkenteken.Kenteken;
            
            
          });
         

        },
        template: '<span>{{kentekenplaat}}</span>'
         
        
    };
});