angular.module('starter.controllers', [])

.factory('issueFactory', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'content/articles.json',
            method: 'GET'
        })
    }
 }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', ['$scope', '$http', 'issueFactory', function($scope, $http, issueFactory) {
    
    $scope.issues = [];
    $scope.index = null;
    
    issueFactory.getIssues().success(function(data){
        $scope.issues = data;
        console.log($scope.issues);
    });
    $scope.setItem = function(item){
        $scope.item = item;
        $scope.$parent.index = item.index;
        
            console.log($scope.index);
    }
    $scope.getIndex = function(){
        return $scope.$parent.index - 1;
    }
    
}])

/*.controller('PlaylistCtrl', ['$scope', '$stateParams', 'issueFactory', function($scope, $stateParams) {
    $scope.issues = [];
    issueFactory.getIssues().success(function(data){
        $scope.issues = data;
    });
}])*/;
