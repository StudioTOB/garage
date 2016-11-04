'use strict';
angular.module('admingarageApp')
.factory('headerService', function($rootScope) {
  var sharedService = {};

  sharedService.message = '';

  sharedService.setPaginaTitel = function(msg) {
    this.message = msg;
    this.getPaginaTitel();
  };

  sharedService.getPaginaTitel = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return sharedService;
});

