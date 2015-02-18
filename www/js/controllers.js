angular.module('starter.controllers', [])

.factory('issueFactory', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'content/platform.json',
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

.controller('IssuesListCtrl', ['$scope', '$http', 'issueFactory', function($scope, $http, issueFactory) {
    
    $scope.platforms = [];
    $scope.item = {};
    
    issueFactory.getIssues().success(function(data){
        $scope.platforms = data;
    
        
    });
    $scope.setItem = function(item){
        $scope.$parent.item = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }
   
    
}])
.controller('TeamCtrl', function ($scope, $http) {
      
      $http.get('content/team.json').success(function(data) {
            $scope.team = data;
        })  
})
/*.controller('PlatformCtrl', function ($scope, $http) {
    
    $scope.platform = {};
      
      $http.get('content/platform.json').success(function(data) {
            $scope.platforms = data;
          console.log(data);
        })
      $scope.setPlatform = function(platform){
        $scope.$parent.platform = platform;
       
    }
    $scope.getPlatform = function(){
        return $scope.$parent.platform;
    }
})*/
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    });
