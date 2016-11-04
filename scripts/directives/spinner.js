'use strict';
angular.module('admingarageApp')
.directive("spinner", function(){
    return {
    restrict: 'E',
    template: '<div ng-hide="dataloaded" class="col-md-12 text-center" style="padding-bottom:40px"><i class="fa fa-spinner fa-spin fa-2x"></i> Items laden...</div>'
    };
});



