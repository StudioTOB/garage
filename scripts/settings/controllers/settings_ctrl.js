'use strict';

angular.module('admingarageApp')
  .controller('SettingsCtrl', function ($scope,$firebaseArray,$timeout,$firebaseObject,headerService,Instellingen) {
      headerService.setPaginaTitel('Settings');

     
      $scope.settings = Instellingen();
                  
      
      $scope.changed = function()
      {
        
      }
      $scope.bewaar_instellingen = function()
      {
      var refSettings = new Firebase('https://garageapp.firebaseio.com/settings/');
      
      refSettings.update({
                          werkorderFormat:$scope.settings.werkorderFormat,
                          volgnummer: $scope.settings.volgnummer,
                          nullen: $scope.settings.nullen
                        });
    
    }
  })
  .factory("Instellingen", ["$firebaseObject",
  function($firebaseObject) {
    return function() {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://garageapp.firebaseio.com/settings/");
      

      // return it as a synchronized object
      return $firebaseObject(ref);
    }
  }
])
.directive('werkOrdernummer', function ($firebaseObject) {
    return {
        
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        link:function(scope,elements,attributes){
            
        

                  var refSettings = new Firebase('https://garageapp.firebaseio.com/settings/');
                  var set = $firebaseObject(refSettings);
                 

                  set.$loaded().then(function(data){
                    
                      var nullen = data.nullen;
                      var aantal = nullen.length;
                      var volg = parseInt(data.volgnummer, 10)+1;
                      
                      var volgnr = String(nullen + volg).slice(-aantal);
                      scope.werkOrder = data.werkorderFormat + volgnr;
            
            
          });

            scope.$watchCollection('settings', function (v) {

                      var nullen = scope.settings.nullen;
                      var aantal = nullen.length;
                      var volg = parseInt(scope.settings.volgnummer, 10)+1;
                      
                      var volgnr = String(nullen + volg).slice(-aantal);
                      scope.werkOrder = scope.settings.werkorderFormat + volgnr;
                
            });

            

         var unwatch = set.$watch(function() {
            
            set.$loaded().then(function(data){
                    
                      var nullen = data.nullen;
                      var aantal = nullen.length;
                      var volg = parseInt(data.volgnummer, 10)+1;
                      
                      var volgnr = String(nullen + volg).slice(-aantal);
                      scope.werkOrder = data.werkorderFormat + volgnr;
            
            
          });
            

          });


        },
        template: '<span>{{werkOrder}}</span>'
         
        
    };
});