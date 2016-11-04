'use strict';

angular.module('admingarageApp')
  .controller('GebruikersCtrl', function ($scope,$rootScope,$http,$timeout, $firebaseArray,Profile, $firebaseObject,$routeParams,$firebaseAuth,headerService,Auth) {
      headerService.setPaginaTitel('Gebruikers');
      
      var ref = new Firebase('https://garageapp.firebaseio.com/gebruikers');
      $scope.gebruikers = $firebaseArray(ref);

      $scope.disabled = false;
      
      $scope.dataloaded = false;
      $scope.gebruikers.$loaded( function() {
          $scope.dataloaded = true;
          
      });
      
        $scope.itemsPerPage = 5;
        $scope.itemsByPage = 5;
        $scope.changed = function() 
        {
            $scope.itemsByPage= $scope.itemsPerPage;
        };

      $scope.gebruikersCollection = [].concat($scope.gebruikers);

       $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK')
        .success(function(data) {
          if(data.ip){$scope.ip = data.ip;}else{$scope.ip = 'Onbekend';}
          if(data.hostname){$scope.hostname = data.hostname;}else{$scope.hostname = 'Onbekend';}
          if(data.loc){$scope.loc = data.loc;}else{$scope.loc = 'Onbekend';}//Latitude and Longitude
          if(data.org){$scope.org = data.org;}else{$scope.org = 'Onbekend';}//organization
          if(data.city){$scope.city = data.city;}else{$scope.city = 'Onbekend';}
          if(data.postal){$scope.postcode = data.postal;}else{$scope.postcode = 'Onbekend';}
          if(data.region){$scope.region = data.region;}else{$scope.region = 'Onbekend';}//state
          if(data.country){$scope.country = data.country;}else{$scope.country = 'Onbekend';}
          if(data.phone){$scope.phone = data.phone;}else{$scope.phone = 'Onbekend';}//city area code 

        //console.log(data);
      }).error(function(error){
          console.log(error);
      });
      
      $scope.createUser = function(profiel) {
        $scope.message = null;
        $scope.error = null;
        $scope.profiel={};
       
          Auth.$createUser({
            email: profiel.email,
            password: profiel.password
          }).then(function(userData) {
          
             var ref = new Firebase("https://garageapp.firebaseio.com/gebruikers/");
             var profileRef = $firebaseArray(ref);
      
           
         
          
          var profileRef = ref.child(userData.uid); 
            profileRef.set({
                          voornaam: profiel.voornaam,
                          achternaam: profiel.achternaam,
                          email: profiel.email,
                          accountType: profiel.accountType,
                          ip: $scope.ip,
                          hostname:$scope.hostname,
                          locatie:$scope.loc,
                          organisatie:$scope.org,
                          plaats:$scope.city,
                          
                          regio:$scope.region,
                          land:$scope.country
                       }, function(error) {
                        if(error == null)
                          {

                           
                            
                            console.log(error);

                            $scope.profiel = {};

                            $scope.originalUser = angular.copy($scope.profiel);
                            $scope.profiel = angular.copy($scope.originalUser);
                             
                          }

                          
                        
                        });
                        
                       
                    
           
            }).catch(function(error) {
              $scope.error = error;
            });
            $scope.message = 'Gebruiker is succesvol aangemaakt';
            $timeout(function() {
              
              $scope.message = '';
            }, 2000);
            
           
    };
     
 
                           

    $scope.showLogMessage = false;

    $scope.inloggen = function(){
        Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
        })
        .then(function(authData) {
            $scope.message = "Authenticated successfully with payload:" + authData;
            console.log(authData);
            var ref = new Firebase("https://garageapp.firebaseio.com/gebruikers/"+ authData.uid);
           var profileRef = $firebaseArray(ref);
           
            $scope.showLogMessage = true;
              $scope.logMessage = 'Welkom';
            $timeout(function() {
              
              $scope.showLogMessage = false;
            }, 2000);
            
            
        })
        .catch(function(error){
            $scope.error = "Login Failed!" + error;
        });
        
    };
    
    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      
      //Profile("physicsmarie").$bindTo($scope, "user");

      // since I can connect from multiple devices or browser tabs, we store each connection instance separately
      // any time that connectionsRef's value is null (i.e. has no children) I am offline
      var myConnectionsRef = new Firebase('https://garageapp.firebaseio.com/gebruikers/'+authData.uid+'/connections');
      // stores the timestamp of my last disconnect (the last time I was seen online)
      var lastOnlineRef = new Firebase('https://garageapp.firebaseio.com/gebruikers/'+authData.uid+'/lastOnline');
      var connectedRef = new Firebase('https://garageapp.firebaseio.com/.info/connected');
      connectedRef.on('value', function(snap) {
        if (snap.val() === true) {
          // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
          // add this device to my connections list
          // this value could contain info about the device or a timestamp too
          var con = myConnectionsRef.push(true);
          // when I disconnect, remove this device
          con.onDisconnect().remove();
          // when I disconnect, update the last time I was seen online
          lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        }
      });
     
    });

    
    $scope.verwijderen = function(id,email,password)
    {
      $scope.gebruikers.$remove(id);
      $scope.message = null;
      $scope.error = null;
      console.log(password);

      Auth.$removeUser({
        email: email,
        password:password
      }).then(function() {
        $scope.message = "User removed";
      }).catch(function(error) {
        $scope.error = error;
      });
      $scope.showLogMessage = true;
              $scope.logMessage = 'Profiel is succesvol verwijderd.';
            $timeout(function() {
              
              $scope.showLogMessage = false;
            }, 2000);
    }




});


