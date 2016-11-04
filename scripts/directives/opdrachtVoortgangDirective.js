'use strict';
angular.module('admingarageApp')
.directive('opdrachtVoortgang', function ($firebaseArray,$firebaseObject) {
    return {
        scope: {
            opdrachtnummer: '@',
            onderdelenGereedCount: '=',
            onderdelenMaxCount: '='

        },
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        link:function(scope,elements,attributes,$scope){
            
        
            
            scope.opdrachtnummer = attributes.opdrachtnummer;
           
            
            var refOpdrachten = new Firebase('https://garageapp.firebaseio.com/opdrachten/');
            var opdrachtRef = refOpdrachten.child(scope.opdrachtnummer);
            var items = opdrachtRef.child('items');
            scope.onderdelen = $firebaseArray(items);
            scope.onderdelen.$loaded(function(){
             scope.onderdelenMaxCount = scope.onderdelen.length;
            var count=0;
            for(var i=0; i< scope.onderdelen.length; i++)
            {
                if(scope.onderdelen[i].gereed)
                {
                    count++;
                }
               // console.log(count);
                
            }
                
            scope.onderdelenGereedCount = count;
            
            
            if(scope.onderdelenGereedCount === scope.onderdelenMaxCount && scope.onderdelenMaxCount !== 0)
            {
                scope.kleur = 'success';
            }
            if(scope.onderdelenMaxCount === 0 && scope.onderdelenGereedCount === 0)
            {
                scope.kleur = 'danger';
            }
        
            if(scope.onderdelenGereedCount < scope.onderdelenMaxCount)
            {
                scope.kleur = 'warning';
            }
          });
        
          //  scope.kleur = 'warning';
            
            scope.onderdelen.$watch(function(event) {
                //console.log(event);
                scope.onderdelen.$loaded(function(){
             scope.onderdelenMaxCount = scope.onderdelen.length;
            var count=0;
            for(var i=0; i< scope.onderdelen.length; i++)
            {
                if(scope.onderdelen[i].gereed)
                {
                    count++;
                }
               // console.log(count);
                
            }
                
            scope.onderdelenGereedCount = count;
            
            
            if(scope.onderdelenGereedCount === scope.onderdelenMaxCount && scope.onderdelenMaxCount !== 0)
            {
                scope.kleur = 'success';
                scope.completed = true;
            }
            if(scope.onderdelenMaxCount === 0 && scope.onderdelenGereedCount === 0)
            {
                scope.kleur = 'danger';
            }
        
            if(scope.onderdelenGereedCount < scope.onderdelenMaxCount)
            {
                scope.kleur = 'warning';
            }
          });
            });
            
        

        },
        template: '<span style="color:black; white-space:nowrap;font-size: 10px;">{{onderdelenGereedCount}}/{{onderdelenMaxCount}}</span><i style="color:green;margin-left:20px; white-space:nowrap;font-size: 10px;"ng-show="completed">Gereed</i><progressbar tooltip="{{onderdelenGereedCount}} van de {{onderdelenMaxCount}} onderdelen zijn gereed."  max="onderdelenMaxCount" type="{{kleur}}" value="onderdelenGereedCount"></progressbar>'
         
        
    };
});