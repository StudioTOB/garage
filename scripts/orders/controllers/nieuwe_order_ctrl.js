'use strict';

angular.module('admingarageApp')
  .controller('NieuweOrderCtrl', function ($scope, Instellingen,$location,$firebaseArray, $firebaseObject,$firebaseAuth,headerService) {
      headerService.setPaginaTitel('Nieuwe WerkOpdracht');

      var ref = new Firebase('https://garageapp.firebaseio.com/gebruikers');
      $scope.gebruikers = $firebaseArray(ref);
      
      var refOpdrachten = new Firebase("https://garageapp.firebaseio.com/opdrachten/");

      var setting = Instellingen();

             
                  setting.$loaded().then(function(data){
                      var nullen = setting.nullen;
                     
                      var aantal = nullen.length;

                      var volg = parseInt(setting.volgnummer, 10)+1;
                      $scope.volgnummer = volg;
                      var volgnr = String(nullen + volg).slice(-aantal);
                      $scope.werkorderFormat = setting.werkorderFormat + volgnr;
            });
            
          
      $scope.bewaar_opdracht = function(opdracht)
      {
      	console.log(opdracht);
      	var opdrachtRef = refOpdrachten.child($scope.werkorderFormat);
      	 opdrachtRef.set({
      	 	klant:$scope.opdracht.klant,
          nummer:$scope.werkorderFormat,
          kenteken:$scope.opdracht.kenteken,
          datum:$scope.opdracht.datum.toJSON(),
          status:'false'

      	 });
         var ref = new Firebase("https://garageapp.firebaseio.com/settings/");
         ref.update({volgnummer:$scope.volgnummer});

         $location.path("/orders");
      };
      
      $scope.getUser = function()
      {
        var userId = $scope.opdracht.klant;

        var voertuigenref = new Firebase('https://garageapp.firebaseio.com/voertuigen/' + userId);
      $scope.voertuigen = $firebaseArray(voertuigenref);
      console.log($scope.voertuigen);
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
]);
