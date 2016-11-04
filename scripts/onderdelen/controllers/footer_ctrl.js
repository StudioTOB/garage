'use strict';

angular.module('admingarageApp')
  .controller('FooterCtrl', function ($scope, $firebaseArray, $firebaseObject,$routeParams) {
      $scope.datum = new Date();
  })


