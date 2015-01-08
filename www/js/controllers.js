angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Subjects) {
  $scope.subjects = [];

    Subjects.getFirst(100).then(function(subjects){
          $scope.subjects = subjects;
    });
})

.controller('CoursesCtrl', function($scope,$ionicViewService) {
      // Clears the navigation route history
    // $ionicViewService.nextViewOptions({
    //    disableBack: true
    // });

  $scope.courses = [
    { code: 'BSCS', title:'Bachelor of Science in Computer Science', id: 1 },
    { code: 'BSIT', title:'Bachelor of Science in Information Technology',id: 2 },
    { code: 'BSED', title:'Bachelor of Science in Secondary Education',id: 3 },
    { code: 'BEED', title:'Bachelor of Science in Elementary Education',id: 4 },
    { code: 'BSAT', title:'Bachelor of Science in Accounting Technology',id: 5 },
    { code: 'BSBA', title:'Bachelor of Science in Business Management',id: 6 }
  ];
})

.controller('CoursesYearLevelCtrl', function($scope, $stateParams) {
  $scope.course = $stateParams;

  $scope.yearLevel = [
    {name: 'First Year',  alias:'Freshmen', id:1},
    {name: 'Second Year', alias:'Sophomore', id:2},
    {name: 'Third Year',  alias:'Juniors',id:3},
    {name: 'Forth Year',  alias:'Seniors',id:4}
  ];
})

.controller('SemesterCtrl', function ($scope, $stateParams) {
  $scope.stateParams = $stateParams;

    $scope.semester = [
      {semesterName:'1st Semester', id:1}, 
      {semesterName:'2nd Semester', id:2}
    ];
})

.controller('SubjectsCtrl', function ($scope, Subjects, $stateParams) {


    $scope.stateParams = $stateParams;
    $scope.subjects = [];

    var string = $stateParams.stateParams;
    console.log(string);

    var array = string.split(",");

    var course = array[0];
    var yearLevel = array[1];
    var semester = array[2];

    Subjects.getByCourse(course, yearLevel, semester).then(function(subjects){
          $scope.subjects = subjects;
    });

    console.log(course);
    console.log(yearLevel);
    console.log(semester);

    // $scope.subjects = [
    //   {id:1, subjectName:'C++ Programming', subjectCode: 'CS 101' }, 
    //   {id:2, subjectName:'Java Programming', subjectCode: 'CS 102'}
    // ];

    $scope.getClassName = function(status) {
      var className = "";

      if (angular.equals(status, "enrolled")) {
          className = "positive"
      };

      if (angular.equals(status, "passed")) {
          className = "balanced"
      };

      if (angular.equals(status, "failed")) {
          className = "energized"
      };

      if (angular.equals(status, "dropped")) {
          className = "assertive"
      };

      return className;
    };

    $scope.changeStatus = function(subjectId, status) {
      console.log(subjectId,status);
      
      // Update subject status
      Subjects.updateStatus(subjectId, status).then(function(result){
          console.log(result);
      });

      // Refresh list
      Subjects.getByCourse(course, yearLevel, semester).then(function(subjects){
          $scope.subjects = subjects;
      });
    
    };


    

    

});
