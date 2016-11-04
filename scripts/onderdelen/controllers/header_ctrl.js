'use strict';

angular.module('admingarageApp')
.controller('HeaderCtrl', function ($scope,$rootScope, $firebaseArray, $firebaseObject,$firebaseAuth,Auth,$routeParams, headerService) {
      //$scope.user = 'Brian Wijnandts';
      
      $scope.datum = new Date();
       $scope.$on('handleBroadcast', function() {
            $scope.pagina = headerService.message;

        });  

       
       $scope.auth = Auth;

        $scope.auth.$onAuth(function(authData) {
        	if(authData){
      	var ref = new Firebase("https://garageapp.firebaseio.com/gebruikers/"+ authData.uid);
           	var profileRef = $firebaseObject(ref);
            $scope.users = profileRef;
        }
        else{
        	$scope.users ='';
        }
      });
})



