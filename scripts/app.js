'use strict';

/**
 * @ngdoc overview
 * @name admingarageApp
 * @description
 * # admingarageApp
 *
 * Main module of the application.
 */
angular
  .module('admingarageApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.select',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ngLocale',
    'textAngular',
    'ui.bootstrap',
    'smart-table',
    'ngMdIcons',
    'tc.chartjs',
    'googlechart',
    'ngMaterial',
    'ui.rCalendar',
    'ngDraggable'
    
  ])
    .run(['$rootScope', '$location', function($rootScope, $location,$scope) {
      $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
          // We can catch the error thrown when the $requireAuth promise is rejected
          // and redirect the user back to the home page
              if (error === 'AUTH_REQUIRED') {
                $location.path('/login');
              }
            });
        
        
    }])
    
  .config(function ($routeProvider) {
    $routeProvider
      .when('/onderdelen/', {
        templateUrl: 'views/onderdelen/onderdelenlijst.html',
        controller: 'MainCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/login/', {
        templateUrl: 'views/gebruikers/login.html',
        controller: 'loginCtrl'
      })
      .when('/onderdeelbewerken/:id', {
        templateUrl: 'views/onderdelen/onderdeelbewerken.html',
        controller: 'onderdeelbewerkenCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/onderdeeldetails/:id', {
        templateUrl: 'views/onderdelen/onderdeeldetails.html',
        controller: 'onderdeeldetailsCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/gebruikers/', {
        templateUrl: 'views/gebruikers/gebruikerslijst.html',
        controller: 'GebruikersCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/gebruikers/:uid', {
        templateUrl: 'views/gebruikers/gebruikerbewerken.html',
        controller: 'GebruikerBewerkenCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/orders/', {
        templateUrl: 'views/orders/orderslijst.html',
        controller: 'OrdersCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/orders/nieuw', {
        templateUrl: 'views/orders/nieuwe_order.html',
        controller: 'NieuweOrderCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/orders/bewerken/:id', {
        templateUrl: 'views/orders/bewerk_order.html',
        controller: 'BewerkOrderCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/settings/', {
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }]
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
