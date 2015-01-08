// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

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
    .state('app.courses', {
      url: "/courses",
      views: {
        'menuContent' :{
          templateUrl: "templates/courses.html",
          controller: 'CoursesCtrl'
        }
      }
    })

    .state('app.course_year', {
      url: "/courses/:courseCode",
      views: {
        'menuContent' :{
          templateUrl: "templates/course_year.html",
          controller: 'CoursesYearLevelCtrl'
        }
      }
    })

    .state('app.course_year_semester', {
      url: "/courses/year/:stateParams",
      views: {
        'menuContent' :{
          templateUrl: "templates/course_year_semester.html",
          controller: 'SemesterCtrl'
        }
      }
    })

    .state('app.course_year_semester_subjects', {
      url: "/courses/year/semester/:stateParams",
      views: {
        'menuContent' :{
          templateUrl: "templates/course_year_semester_subjects.html",
          controller: 'SubjectsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.constant('DB_CONFIG', {
    name: 'SubjectTrackerDbDemo_01',
    tables: {
        subjects: {
            id: 'integer primary key ',
            status: 'text',
            subjectName: 'text ',
            desc: 'text',
            units: 'integer',  
            course: 'text',
            yearLevel : 'integer',
            semester : 'integer'
        }
    }
});
