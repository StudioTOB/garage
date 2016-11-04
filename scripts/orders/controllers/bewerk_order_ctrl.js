'use strict';

angular.module('admingarageApp')
  .controller('BewerkOrderCtrl', function ($scope,$rootScope,$http ,$timeout,$modal,$interval,GemiddeldeTijd,$filter, $firebaseArray,Profile, ListWithTotal,$firebaseObject,$routeParams,$firebaseAuth,headerService,Auth) {
      headerService.setPaginaTitel('Bewerk Order');

      $scope.itemsPerPage = 5;
        $scope.itemsByPage = 5;
        $scope.changed = function() 
        {
            $scope.itemsByPage= $scope.itemsPerPage;
        };
     
        $scope.info = false;
        $scope.chartStyle = 'margin-left:0px;margin-top:10px; background-color: white;';
        $scope.infoToggle = function()
        {
          if($scope.info == false)
          {
            $scope.info = true;
            $scope.chartStyle = 'margin-left:0px;margin-top:10px; background-color: white;';
          }
          else
          {
             $scope.info = false;
             $scope.chartStyle = 'margin-left:0px; margin-top:10px; background-color: white;';
          }
        }



      var ref = new Firebase('https://garageapp.firebaseio.com/gebruikers');
      $scope.gebruikers = $firebaseArray(ref);


      
      var refOpdrachten = new Firebase("https://garageapp.firebaseio.com/opdrachten/" + $routeParams.id);
      $scope.opdracht = $firebaseObject(refOpdrachten);
      
      $scope.dataloaded = false;
      $scope.opdracht.$loaded()
          .then(function(data) {

          var refKlant = new Firebase("https://garageapp.firebaseio.com/gebruikers/");
          var klantRef = refKlant.child($scope.opdracht.klant);
          $scope.getklant = $firebaseObject(klantRef);
          
          $scope.dataloaded = true;
          $scope.getklant.$loaded(data)
          .then(function(data) {
          $scope.klantId = $scope.getklant.$id;
          console.log($scope.getklant);
          
          $scope.kenteken = $scope.opdracht.kenteken;
          console.log($scope.kenteken);
           var refVoertuig = new Firebase("https://garageapp.firebaseio.com/voertuigen/" + $scope.klantId + "/" + $scope.kenteken);
          $scope.voertuigInfo = $firebaseObject(refVoertuig);
          console.log($scope.voertuigInfo);
        });
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

      $scope.bewaar_opdrachtItem = function(onderdeel)
      {
        var refOpdrachtenitem = new Firebase("https://garageapp.firebaseio.com/opdrachten/" + $routeParams.id +"/items/");
        var item = $firebaseArray(refOpdrachtenitem);
        
        var refOnderdelen = new Firebase('https://garageapp.firebaseio.com/onderdelen/'+ $scope.opdrachtItem);
        var refOnderdeel = $firebaseObject(refOnderdelen);
        console.log($scope.geselOnderdeel[0].id);
        console.log($scope.geselOnderdeel[0].naam);
        refOnderdeel.$loaded().then(function(refOnderdeel) {
            $scope.Add_naam = $scope.geselOnderdeel[0].naam;
            $scope.Add_prijs = $scope.geselOnderdeel[0].prijs;
            $scope.Add_leverancier = $scope.geselOnderdeel[0].leverancier;

            item.$add({

              onderdeelId:$scope.geselOnderdeel[0].id,
              naam:$scope.Add_naam,
              prijs:$scope.Add_prijs,
              leverancier:$scope.Add_leverancier
            })

        });
      }

          // Onderdeel toevoegen 
              $scope.geselOnderdeel = [];
               var refOnderdelen = new Firebase('https://garageapp.firebaseio.com/onderdelen');
               $scope.onderdelen = $firebaseArray(refOnderdelen);

               $scope.model = {// set the initial selected option
                              };

               $scope.$watch('model.onderdeel', function (onderdeel) {
                  if(onderdeel){
                    $scope.geselOnderdeel = [];
            
                    $scope.geselOnderdeel.push({id:onderdeel.$id,naam:onderdeel.naam,prijs:onderdeel.prijs,leverancier:onderdeel.leverancier});
               
                  }
              });
       
      

      $scope.getOnderdelen = function () {

        $scope.onderdelen.$loaded().then(function(onderdelen) {
        $scope.data = [];
         angular.forEach( $scope.onderdelen, function(value, key){
           // console.log(value);
            $scope.data.push(value);
            });
          //console.log($scope.data);
          return $scope.data;
          });

        };


      
      var refOrderOnderdelen = new Firebase("https://garageapp.firebaseio.com/opdrachten/" + $routeParams.id +"/items/");
       


      $scope.orderOnderdelen = $firebaseArray(refOrderOnderdelen);
      $scope.orderOnderdelenCollection = [].concat($scope.orderOnderdelen);
      $scope.dataloaded = false;
      $scope.orderOnderdelen.$loaded( function() {
          $scope.dataloaded = true;
          
      });

   
      $scope.chartSelectie = false;

        $scope.chartToggle = function()
        {
          if($scope.chartSelectie == false)
          {
            $scope.chartSelectie = true;
          }
          else
          {
             $scope.chartSelectie = false;
          }
        }
  
      
      

      
     $scope.selectedOnderdeel = function(idOnderdeel){

      $scope.chartSelectie = true;
    
     var refGem = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + idOnderdeel + '/gemiddeldetijden/');
      var gemiddeldeMonteur = $firebaseArray(refGem);
      

      gemiddeldeMonteur.$loaded().then(function() {

          $scope.monteurArray = [];
          $scope.tijdenArray = [];
          $scope.score = []
          angular.forEach(gemiddeldeMonteur, function(value,key){
            
              var monteurId = value.uid;
              var refMont = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + idOnderdeel + '/gemiddeldetijden/'+ monteurId);
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
     


      var refOnderdelen = new Firebase('https://garageapp.firebaseio.com/onderdelen/' + idOnderdeel + '/tijden/');
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

     

}



  })

.factory("ListWithTotal", ["$firebaseArray",
  function($firebaseArray) {
    // create a new service based on $firebaseArray
    var ListWithTotal = $firebaseArray.$extend({
      getTotal: function() {
        var total = 0;
        // the array data is located in this.$list
        angular.forEach(this.$list, function(rec) {
          total += rec.amount;
        });
        return total;
      }
    });
    return function(listRef) {
      // create an instance of ListWithTotal (the new operator is required)
      return new ListWithTotal(listRef);
    }
  }
])
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
.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
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

      format = format || 'hhuur   mmmin   sssec';
      isPadded = angular.isDefined(isPadded)? isPadded: true;
      hh = isPadded? padding(hh, 2): hh;
      mm = isPadded? padding(mm, 2): mm;
      ss = isPadded? padding(ss, 2): ss;
      
      return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
    };
  })

.directive('scrollup', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind("click", function () {

                    // Maybe abstract this out in an animation service:
                    // Ofcourse you can replace all this with the jQ 
                    // syntax you have above if you are using jQ
                    function scrollToTop(element, to, duration) {
                        if (duration < 0) return;
                        var difference = to - element.scrollTop;
                        var perTick = difference / duration * 10;

                        setTimeout(function () {
                            element.scrollTop = element.scrollTop + perTick;
                            scrollToTop(element, to, duration - 10);
                        }, 12);
                    }

                    // then just add dependency and call it
                    scrollToTop($document[0].body, 0, 100);
                });
            }
        };
});

