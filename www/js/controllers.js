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

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {
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
    
     var template = '<ion-popover-view><ion-content><div class="list"><h2>Trinity Central</h2><p>152-160 Pearse Street</p><p>Dublin 2</p><p>Ireland</p></div></ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope,
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})

.controller('IssuesListCtrl', ['$scope', '$http', '$ionicModal', '$timeout', '$ionicSlideBoxDelegate', 'issueFactory', function($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $timeout, issueFactory) {
    
    $scope.platforms = [];
    $scope.item = {};

    issueFactory.getIssues().success(function(data){
        $scope.platforms = data;


    });
    
    $scope.setItem = function(item){
        
        $scope.$parent.item = item;
        $scope.$parent.images = item.images;
        
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log('Test');
    }
// Image Modal
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/imageModal.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeImage = function() {
    $scope.modal.hide();
    };

    // Open the login modal
    $scope.showImage = function() {
        $scope.modal.show();
        /*$ionicSlideBoxDelegate.update();*/
        console.log($scope.images);
    };
    
}])
.controller('TeamCtrl', function ($scope, $http, $ionicPopover) {
      
      $http.get('content/team.json').success(function(data) {
            $scope.team = data;
          
            $scope.contact = [];
            angular.forEach(data, function(value){
               this.push(value["contact"]);
            }, $scope.contact);
            
            console.log($scope.contact);
          
        })
      $scope.memberNum = Number;
      
      $scope.setContact = function(num){
        
          $scope.$parent.memberNum = num;
          console.log($scope.$parent.memberNum);
      }
      
      /*$scope.getContact = function(){
          return $scope.$parent.memberNum;
          console.log($scope.$parent.memberNum);
              
      }*/
      
      $scope.teamPopover = $ionicPopover.fromTemplateUrl('templates/team-popover.html', {
            scope: $scope,
      }).then(function(teamPopover) {
        $scope.teamPopover = teamPopover;
      });

      $scope.openPopover = function($event) {
        $scope.teamPopover.show($event);
      };
      $scope.closePopover = function() {
        $scope.teamPopover.hide();
      };
      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.teamPopover.remove();
      });
      // Execute action on hide popover
      $scope.$on('teamPopover.hidden', function() {
        // Execute action
      });
      // Execute action on remove popover
      $scope.$on('teamPopover.removed', function() {
        // Execute action
      });
    
    

})

/*.controller('TeamPopCtrl', function ($scope, $http) {
      
      $http.get('content/team.json').success(function(data) {
          $scope.contact = [];
          angular.forEach(data, function(value){
               this.push(value["contact"]);
          }, $scope.contact);
          console.log($scope.contact);
        });
  
})*/

.controller('MapCtrl', function($scope, $ionicLoading) {
    
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

  $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

  navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});



    


    