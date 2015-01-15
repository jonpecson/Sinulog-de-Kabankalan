// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'firebase'])

.run(function($ionicPlatform,DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      // StatusBar.hide();
    }

    // Initialize database
    DB.init();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })

    .state('app.chat', {
      url: "/chat",
      views: {
        'menuContent' :{
          templateUrl: "templates/chat.html",
          controller: 'ChatCtrl'
        }
      }
    })

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/home');
    $urlRouterProvider.otherwise('/login');
})

.constant('DB_CONFIG', {
    name: 'SubjectTrackerDbDemo08',
    tables: {
        subjects: {
            id: 'integer primary key',
            status: 'text',
            subjectName: 'text',
            desc: 'text',
            units: 'integer',  
            course: 'text',
            yearLevel : 'integer',
            semester : 'integer',
            dateModified : 'text'
        }
    }
})

.filter('timeAgo', function (){
  var cache = [];
  return function(date) {
    if(typeof cache[date] === 'string')return cache[date];
    var prettyDate = moment(date, 'X').fromNow();
    cache[date] = prettyDate;
    return prettyDate;
  }
})

.filter('fromNow', ['$window', function ($window) {
    return function (dateString) {
        return $window.moment(new Date(dateString)).fromNow()
    };
}]);



