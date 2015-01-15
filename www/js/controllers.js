angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$timeout, $rootScope, Auth, $state) {

  $scope.auth = Auth;

  $scope.isShow = false;
  $scope.toggleSearch = function() {
    $scope.isShow =true;
  }


  $scope.login = function() {
    $state.go('login');
  }

  $scope.logout = function() {
      $scope.auth.$unauth();
      $rootScope.user = $scope.auth.$getAuth();
  };

  


    $scope.events = [{
      time:'8:00 AM',
      eventName: 'Motorcade - Negros Sinulog Queen 2015 Candidates', 
      location : 'Sampaguita Rally, City Hall Grounds',
      day : 'FRI'
    },{
      time:'9:00 AM', 
      eventName: 'Courtesy Call - Negros Sinulog Queen 2015 Candidates',
      location : '', 
      day : 'FRI'
    },{
      time:'3:00 PM - 6:00 PM', 
      eventName: 'Tripple K Gymnastics & Acrobat Entertainment',
      location : 'City Plaza', 
      day : 'FRI'
    },{
      time:'5:00 PM', 
      eventName: 'Novena Mass',
      location : 'St. Francis Xavier Cathedral', 
      day : 'FRI'
    },{
      time:'7:00 PM', 
      eventName: 'RMN Hip Hop Challenge',
      location : 'City Plaza', 
      day : 'FRI'
    },{
      time:'7:00 PM', 
      eventName: 'Pageant & Coronation Night - Negros Sinulog Queen 2015',
      location : 'K-Center', 
      day : 'FRI'
    },{
      time:'8:00 PM', 
      eventName: 'Fireworks Competition',
      location : 'City Hall Grounds', 
      day : 'FRI'
    },{
      time:'9:00 PM', 
      eventName: 'Sinulog Music Fest/Sinulog Take Over feat. Local, Manila & Intl DJs',
      location : 'City Plaza', 
      day : 'FRI'
    },{
      time:'5:00 AM - 10:00 AM', 
      eventName: 'Sinulog de Kabankalan Duathlon Race',
      sponsor: 'Sponsored by : JCI Kabankalan Bangkal & Molassess  & Kabankalan Run Club',
      location : 'City Football Field',
      day : 'SAT'
    },{
      time:'8:00 AM', 
      eventName: 'AutoCross, SuperMoto',
      location : 'City Hall Grounds', 
      day : 'SAT'
    },{
      time:'4:30 PM', 
      eventName: 'Novena Mass',
      location : 'St. Francis Xavier Cathedral', 
      day : 'SAT'
    },{
      time:'5:30 PM', 
      eventName: 'Motorcade of Santo Niño, Cathedral to Sacred Heart of Jesus Chapel',
      location : 'Brgy. Talubangi', 
      day : 'SAT'
    },{
      time:'6:00 PM', 
      eventName: 'Holy Mass & Vigil, Cathedral to Sacred Heart of Jesus Chapel',
      location : 'Brgy. Talubangi', 
      day : 'SAT'
    },{
      time:'6:00 PM', 
      eventName: 'Sinulog de Kabankalan Mardi Grass 2015 w/ Sinulog Queen Winners',
      location : 'Guanzon Street to City Plaza',
      day : 'SAT'
    },{
      time:'9:00 PM', 
      eventName: 'JCI Kabankalan Bangkal Sound Off',
      location : 'Guanzon Street', 
      day : 'SAT'
    },{
      time:'9:00 PM', 
      eventName: 'Featuring Artists from Manila',
      location : 'City Plaza', 
      day : 'SAT'
    },{
      time:'9:00 PM', 
      eventName: 'Sinulog Music Fest/Sinulog Take Over featuring Local, Manila & Intl DJs',
      location : 'City Football Field', 
      day : 'SAT'
    },{
      time:'9:00 PM', 
      eventName: 'Local / Manila Band',
      location : 'City Plaza', 
      day : 'SAT'
    },{
      time:'4:00 AM', 
      eventName: 'Diana',
      location : '', 
      day : 'SUN'
    },{
      time:'4:10 PM', 
      eventName: 'Fluvial Procession of Sto. Niño',
      location : 'Ilog-Hilabangan River', 
      day : 'SUN'
    },{
      time:'7:00 AM', 
      eventName: 'Sugat sa Lugway',
      location : 'Lugway, Brgy. 8', 
      day : 'SUN'
    },{
      time:'7:00 AM', 
      eventName: 'Assembly of Tribes',
      location : 'City Hall Grounds', 
      day : 'SUN'
    },{
      time:'8:00 AM', 
      eventName: 'Concelebrated Mass',
      location : 'City Hall Grounds', 
      day : 'SUN'
    },{
      time:'9:30 AM', 
      eventName: 'Grand Tribal Parade',
      location : 'City Hall Grounds to City Plaza', 
      day : 'SUN'
    },{
      time:'1:00 PM', 
      eventName: 'Grand Tribal Competition & Final Judging',
      location : 'City Plaza', 
      day : 'SUN'
    },{
      time:'6:00 PM', 
      eventName: 'Awarding and Closing Ceremonies',
      location : 'City Plaza', 
      day : 'SUN'
    },{
      time:'8:00 PM', 
      eventName: 'Fireworks Display',
      location : 'City Hall Grounds', 
      day : 'SUN'
    },{
      time:'9:00 PM', 
      eventName: 'Sinulog Music Fest/Sinulog Take Over featuring Local, Manila & Intl DJs',
      location : 'City Football Field', 
      day : 'SUN'
    },{
      time:'9:00 PM', 
      eventName: 'Local / Manila Band',
      location : 'City Plaza', 
      day : 'SUN'
    }]
})

.controller('ChatCtrl', function($scope, $firebase, $rootScope,$timeout) {

  

    var ref = new Firebase('https://sinulogdekabankalan.firebaseio.com/chats');
    var sync = $firebase(ref);
    $scope.chats = sync.$asArray(); 
    var refreshDates = function () {
        $timeout(refreshDates, 1000);
    };
    refreshDates();
  

  $scope.getCurrentDate = function(timeAgo) {
    var time = moment(timeAgo);
    // var validateTime = new Date(time).getTime().toString()
    // console.log(time);
    return time;

  };

  
   
        
  $scope.sendChat = function(chat) {

    var time = moment();
    var timeStamp = new Date(time).getTime(); 
    console.log(new Date(time).getTime()); 


    console.log($rootScope.user.facebook);
      $scope.chats.$add({
          user: $rootScope.user.facebook.displayName,
          face: $rootScope.user.facebook.cachedUserProfile.picture.data.url,
          message: chat.message,
          timestamp : timeStamp
      });
      chat.message = "";
  }

})

.controller('LoginCtrl', function($scope, Auth, $timeout, $rootScope, $state) { 


  $scope.auth = Auth;
  // $scope.user = [];

  $scope.login = function(provider) {
    // 1. Check if $authWithOAuthPopup is available
    $scope.auth.$authWithOAuthPopup(provider,function(error, authData) {
      
      if (error) {
        // 2. If $authWithOAuthPopup is not available   
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          $scope.auth.$authWithOAuthRedirect(provider, function(error, authData) { /* ... */ });
        }
      }

    });
  };

  // On auth listener
  $scope.auth.$onAuth(function() {
    $timeout(function() {
       $rootScope.user = $scope.auth.$getAuth();
        if ($rootScope.user) {
          $state.go('app.home');
        };
       
    });
  });



});