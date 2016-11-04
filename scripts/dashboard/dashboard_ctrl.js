'use strict';
angular.module('admingarageApp')

  .controller('DashboardCtrl', function ($scope, $firebaseArray,$firebaseObject,$routeParams,headerService,currentAuth) {
    
     
     headerService.setPaginaTitel('Dashboard');

    

   var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
            $scope.opdrachten = $firebaseArray(refOpdrachten);
            
            $scope.dataloaded = false;
            $scope.opdrachten.$loaded(function() {
                $scope.dataloaded = true;
                var vandaag = new Date();

               console.log(vandaag);
               console.log($scope.opdrachten.datum);
               for(var i=0; i< $scope.opdrachten.length; i++)
               {
                var dag = $scope.opdrachten[i].datum;
                console.log(dag);
               }
                if($scope.opdrachten.datum < vandaag)
                {
                    console.log($scope.opdrachten.datum); 
                }
              });
    

  });