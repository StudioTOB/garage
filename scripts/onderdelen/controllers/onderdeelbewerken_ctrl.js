'use strict';

angular.module('admingarageApp')
  .controller('onderdeelbewerkenCtrl', function ($scope, $firebaseObject,$routeParams,$window, headerService) {
    headerService.setPaginaTitel('Onderdeel Bewerken ');
     var onderdeelId = $routeParams.id;
     
      var ref = new Firebase('https://garageapp.firebaseio.com/onderdelen/'+ onderdeelId);
      $scope.onderdelen = $firebaseObject(ref);
      console.log($scope.onderdelen);
     $scope.onderdeel_bewerken = function(onderdeel)
     {
         console.log(onderdeel);
         $scope.onderdelen.$save();
         $window.location.href= "#/";
     };
     
  });


