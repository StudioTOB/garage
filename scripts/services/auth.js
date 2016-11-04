'use strict';
angular.module('admingarageApp')
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://garageapp.firebaseio.com/");
    return $firebaseAuth(ref);
  }
])
.factory("UpdateProfile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://garageapp.firebaseio.com/gebruikers/");
      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])
.factory("Profile", ["$firebaseObject",
  function($firebaseArray) {
    return function(username) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://garageapp.firebaseio.com/gebruikers/");
      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseArray(profileRef);
    }
  }
]);