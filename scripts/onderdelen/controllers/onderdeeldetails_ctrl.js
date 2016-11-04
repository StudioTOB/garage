'use strict';

angular.module('admingarageApp')
  .controller('onderdeeldetailsCtrl', function ($scope,$routeParams,$firebaseAuth,Monteur,$filter,GemiddeldeTijd, $firebaseArray, $firebaseObject, headerService) {
      
      var ref = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + $routeParams.id + '/');
      var onderdeel = $firebaseObject(ref);
      onderdeel.$loaded()
          .then(function(data) {
      		headerService.setPaginaTitel('Details Onderdeel: '+ onderdeel.naam);
		});

      var refGem = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + $routeParams.id + '/gemiddeldetijden/');
      var gemiddeldeMonteur = $firebaseArray(refGem);
      

      gemiddeldeMonteur.$loaded().then(function() {

          $scope.monteurArray = [];
          $scope.tijdenArray = [];
          $scope.score = []
          angular.forEach(gemiddeldeMonteur, function(value,key){
            
              var monteurId = value.uid;
              var refMont = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + $routeParams.id + '/gemiddeldetijden/'+ monteurId);
              refMont.on('value',function(snap){

                $scope.naamMonteur = snap.val().monteur;

                $scope.monteurArray.push($scope.naamMonteur);
                
                $scope.tijdMonteur = snap.val().totaaltijd;
                $scope.aantalMonteur = snap.val().aantal;
                $scope.gemiddeldeTijd = ($scope.tijdMonteur / $scope.aantalMonteur).toFixed(0);

                $scope.tijdenArray.push($scope.gemiddeldeTijd);

                $scope.score.push({monteur:$scope.naamMonteur,tijd:$scope.gemiddeldeTijd});

              });

          });

      });
     


      var refOnderdelen = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + $routeParams.id + '/tijden/');
      $scope.onderdeel = $firebaseArray(refOnderdelen);
      $scope.gekozen = 'bar';
      $scope.updategekozenchart = function()
      {
        $scope.gekozen = $scope.kieschart;
      }
      $scope.dataloaded = false;
      $scope.onderdeel.$loaded()
          .then(function(data) {
            $scope.dataloaded = true;
      
		        // Chart.js Data
      	    $scope.data = {
      	      labels: $scope.monteurArray,
      	      datasets: [
      	        {
      	          label: 'Tijden (in Secondes)',
                fillColor: '#ffeee8',
                strokeColor: '#FF5722',
                pointColor: '#FF5722',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
      	          data: $scope.tijdenArray
      	        }
      	      ]

      	    };
      	  });

	         // Chart.js Options
          $scope.options =  {

            // Sets the chart to be responsive
            responsive: true,

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            // Function - on animation progress
            onAnimationProgress: function(){},

            // Function - on animation complete
            onAnimationComplete: function(){},

            //String - A legend template
            legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
          };

         
})
  .factory("GemiddeldeTijd", function($firebaseArray) {
    return $firebaseArray.$extend({
      sum: function() {
        var total = 0;
        angular.forEach(this.$list, function(tijden) {
          
          total += tijden.tijd;
        });
        return total;
      }
    });
  })

  .factory("Monteur", function($firebaseObject) {
    var monteur = {};
      monteur.naam =  function(routeId,monteurId) {
            var refMont = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + routeId + '/gemiddeldetijden/'+ monteurId);
            var arrayMonteur = $firebaseObject(refMont);

            return arrayMonteur;
      }
    return monteur;
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
        while(zeroes-- > 0) pad += '0';
        return pad + value;
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