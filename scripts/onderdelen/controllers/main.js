'use strict';

angular.module('admingarageApp')
  .controller('MainCtrl', function ($scope, $firebaseArray, $firebaseObject,$routeParams,headerService,currentAuth) {
    
     
     headerService.setPaginaTitel('Onderdelen');
     
    
     
      var ref = new Firebase('https://garageapp.firebaseio.com/onderdelen');
      $scope.onderdelen = $firebaseArray(ref);
      
      $scope.htmlcontent = 'test';
		  $scope.disabled = false;
      
      $scope.dataloaded = false;
      $scope.onderdelen.$loaded( function() {
          $scope.dataloaded = true;
          
      });
      
        $scope.itemsPerPage = 5;
        $scope.itemsByPage = 5;
        $scope.changed = function() 
        {
            $scope.itemsByPage= $scope.itemsPerPage;
        };
     
     $scope.displayedCollection = [].concat($scope.onderdelen);
      
     $scope.nieuw_onderdeel = function(onderdeel)
     {
         $scope.onderdelen.$add({
             naam:$scope.naam.onderdeel,
             prijs:$scope.prijs.onderdeel,
             leverancier:$scope.leverancier.onderdeel
         });
         //$scope.displayedCollection.push($scope.onderdelen);
         $scope.naam.onderdeel ="";
         $scope.prijs.onderdeel ="";
         $scope.leverancier.onderdeel ="";
         
         $scope.alerts = [];

        $scope.addAlert = function() {
          $scope.alerts.push({type: 'success', msg: 'Onderdeel is Opgeslagen'});
        };

        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
        
         $scope.addAlert();
         
        
     };
     
    
     
  });