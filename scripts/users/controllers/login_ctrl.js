'use strict';

angular.module('admingarageApp')
  .controller('loginCtrl', function ($scope,$rootScope,$http,$timeout,$location, $firebaseArray,Profile, $firebaseObject,$routeParams,$firebaseAuth,headerService,Auth) {
      headerService.setPaginaTitel('Inloggen');
      
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
              $location.path('gebruikers');
           
            
            
        })
        .catch(function(error){
            $scope.error = "Login Failed!" + error;
        });
        
    };
    
    $scope.auth = Auth;
    

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      
     //Redirect naar login pagina als de session is expired
     if(!authData)
     {
      $location.path('/login/');
     }
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

    
    




});


