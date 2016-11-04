'use strict';
angular.module('admingarageApp')
   .directive('klantgegevens', function ($firebaseObject) {
    return {
        scope:{},
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        link:function(scope,elements,attributes){
            scope.id = attributes.id;

            var refKlant = new Firebase("https://garageapp.firebaseio.com/gebruikers/");
            var klantRef = refKlant.child(scope.id);
            scope.getklant = $firebaseObject(klantRef);
            scope.getklant.$loaded(function(){
             scope.voornaam = scope.getklant.voornaam;
             scope.achternaam = scope.getklant.achternaam;
          });
         

        },
        template: '<span>{{voornaam}} {{achternaam}}</span>'
         
        
    };
});