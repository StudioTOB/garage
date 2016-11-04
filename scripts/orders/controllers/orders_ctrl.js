'use strict';

angular.module('admingarageApp')
  .controller('OrdersCtrl', function ($scope,$rootScope,$http,$timeout, $modal, $location, $firebaseArray,Profile, $firebaseObject,$routeParams,$firebaseAuth,headerService)
  {
      headerService.setPaginaTitel('Orders');

 

    $scope.selectedOrder = function(id)
    {
      $location.path('/orders/bewerken/' + id);
    }

      $scope.changed = function() 
                {
                    $scope.itemsByPage= $scope.itemsPerPage;
                };
               
              
           
     
      $scope.changeOrderview = function()
      {
        if($scope.whatOrders == 1)
        {
          var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
            $scope.opdrachten = $firebaseArray(refOpdrachten);
            
            $scope.dataloaded = false;
            $scope.opdrachten.$loaded(function() {
                $scope.dataloaded = true;
                
                $scope.itemsPerPage = 5;
                $scope.itemsByPage = 5;
                $scope.changed = function() 
                {
                    $scope.itemsByPage= $scope.itemsPerPage;
                };
                $scope.opdrachtenCollection = [].concat($scope.opdrachten);
                
              });
        }
        if($scope.whatOrders == 2)
        {
          var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
          var opdr = refOpdrachten.orderByChild('status').equalTo('false');
            $scope.opdrachten = $firebaseArray(opdr);
            
            $scope.dataloaded = false;
            $scope.opdrachten.$loaded(function() {
                $scope.dataloaded = true;
                
                $scope.itemsPerPage = 5;
                $scope.itemsByPage = 5;
                $scope.changed = function() 
                {
                    $scope.itemsByPage= $scope.itemsPerPage;
                };
                $scope.opdrachtenCollection = [].concat($scope.opdrachten);
                
              });
        }
        if($scope.whatOrders == 3)
        {
          var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
          var opdr = refOpdrachten.orderByChild('status').equalTo('gereed');
            $scope.opdrachten = $firebaseArray(opdr);
            
            $scope.dataloaded = false;
            $scope.opdrachten.$loaded(function() {
                $scope.dataloaded = true;
                
                $scope.itemsPerPage = 5;
                $scope.itemsByPage = 5;
                $scope.changed = function() 
                {
                    $scope.itemsByPage= $scope.itemsPerPage;
                };
                $scope.opdrachtenCollection = [].concat($scope.opdrachten);
                
              });
        }


      }
      var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
      var opdr = refOpdrachten.orderByChild('status').equalTo('false');
      $scope.opdrachten = $firebaseArray(opdr);
      
      $scope.dataloaded = false;
      $scope.opdrachten.$loaded(function() {
          $scope.dataloaded = true;
          
          $scope.opdrachtenCollection = [].concat($scope.opdrachten);
          
        });

     

      $scope.verwijderen = function(id)
      {
        //$scope.opdrachten.$remove(id);
        $scope.id = id;
        var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../views/includes/verwijderen_modal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        opdracht: function () {
          return $scope.opdrachten;
        },
        id: function () {
          return $scope.id;
        }
      }
      
    });
      };

      $scope.reverse = true;
      
    })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance,opdracht, $firebaseArray,id) {

  
  $scope.ok = function () {
    opdracht.$remove(id);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
  .filter('time', function() {
    
    var conversions = {
      'ss': angular.identity,
      'mm': function(value) { return value * 60; },
      'hh': function(value) { return value * 3600; }
    };
    
    var padding = function(value, length) {
      var zeroes = length - ('' + (value)).length,
          pad = '';
      while(zeroes-- > 0) {pad += '0';
        return pad + value;
      }
    };
    
    return function(value, unit, format, isPadded) {
      var totalSeconds = conversions[unit || 'ss'](value),
          hh = Math.floor(totalSeconds / 3600),
          mm = Math.floor((totalSeconds % 3600) / 60),
          ss = totalSeconds % 60;
      
      format = format || 'hh:mm:ss';
      isPadded = angular.isDefined(isPadded)? isPadded: true;
      hh = isPadded? padding(hh, 2): hh;
      mm = isPadded? padding(mm, 2): mm;
      ss = isPadded? padding(ss, 2): ss;
      
      return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
    };
  });