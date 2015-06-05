angular.module('starter.controllers', [])

.factory('issuesThinkCentral', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1M0sLk5iTye4pe_EyHtF5WadrK9S_h0xsiHY-uDGh2dc/od6/public/values?alt=json',
            method: 'GET'
        })
    }
 }
})

.factory('issuesHmof', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1huBXSUHO39y9WAFQagxoY8z3oiz1h9MFSc-Vx0hIXJE/od6/public/values?alt=json',
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

.controller('IssuesListCtrl', ['$scope', '$http', '$ionicModal', '$timeout', '$ionicSlideBoxDelegate', 'issuesThinkCentral', 'issuesHmof', function($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $timeout, issuesThinkCentral, issuesHmof) {
    
    
    $scope.item = {};

    issuesThinkCentral.getIssues().success(function(data){
        
        console.log(data);
        $scope.thinkcentral = [];
        /*$scope.images = [];*/
        
        angular.forEach(data.feed.entry, function(value){
                
                var issue = value["gsx$issue"].$t,
                    cause = value["gsx$cause"].$t,
                    hint = value["gsx$hint"].$t,
                    jira = value["gsx$jira"].$t,
                    process = value["gsx$process"].$t,
                    thumb = value["gsx$thumb"].$t,
                    text = value["gsx$text"].$t;
            
                
               this.push({thumb:thumb,issue:issue, cause:cause, hint:hint, jira:jira, process:process, text:text, });
            }, $scope.thinkcentral);
        
            console.log($scope.thinkcentral);
            console.log(typeof($scope.process));

            }).error(function(){
                console.log('Couldnt find latest Issues'); 
                $http.get('content/thinkcentral.json').success(function(data){
                    console.log(data);
                $scope.thinkcentral = [];
                /*$scope.images = [];*/

                angular.forEach(data.feed.entry, function(value){

                        var issue = value["gsx$issue"].$t,
                            cause = value["gsx$cause"].$t,
                            hint = value["gsx$hint"].$t,
                            jira = value["gsx$jira"].$t,
                            process = value["gsx$process"].$t,
                            thumb = value["gsx$thumb"].$t,
                            text = value["gsx$text"].$t;


                       this.push({thumb:thumb,issue:issue, cause:cause, hint:hint, jira:jira, process:process, text:text, });
                    }, $scope.thinkcentral);

                    console.log($scope.thinkcentral); 
                });
            });
    
    issuesHmof.getIssues().success(function(data){
        
        console.log(data);
        $scope.hmof = [];
        /*$scope.images = [];*/
        
        angular.forEach(data.feed.entry, function(value){
                
                var issue = value["gsx$issue"].$t,
                    cause = value["gsx$cause"].$t,
                    hint = value["gsx$hint"].$t,
                    jira = value["gsx$jira"].$t,
                    process = value["gsx$process"].$t,
                    thumb = value["gsx$thumb"].$t,
                    text = value["gsx$text"].$t;
            
                
               this.push({thumb:thumb, issue:issue, cause:cause, hint:hint, jira:jira, process:process, text:text});
            }, $scope.hmof);
        
            console.log($scope.hmof);

        }).error(function(){
            console.log('Couldnt find latest Issues'); 
            $http.get('content/hmof.json').success(function(data){
                console.log(data);
            $scope.hmof = [];
            /*$scope.images = [];*/

            angular.forEach(data.feed.entry, function(value){

                    var issue = value["gsx$issue"].$t,
                        cause = value["gsx$cause"].$t,
                        hint = value["gsx$hint"].$t,
                        jira = value["gsx$jira"].$t,
                        process = value["gsx$process"].$t,
                        thumb = value["gsx$thumb"].$t,
                        text = value["gsx$text"].$t;


                   this.push({thumb:thumb, issue:issue, cause:cause, hint:hint, jira:jira, process:process, text:text});
                }, $scope.hmof);

                console.log($scope.hmof);
            });
        });
    
    $scope.setItem = function(item){
        
        console.log(item);
        
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
.controller('TeamCtrl', function ($scope, $http, $ionicPopover, $ionicLoading) {
    
        $ionicLoading.show({
            template: '<p>Updating some commoditys info</p><i class="icon ion-loading-c"></i>',
            showBackdrop: true
        });
    
    /*var url = 'content/team.json';*/
    var url = 'https://spreadsheets.google.com/feeds/list/1X2Tspx4jG86kPw8QPeStiXh9vZS9YcFvDwNI2IAMWZs/od6/public/values?alt=json';
      
      $http.get(url).success(function(data) {
          
            $ionicLoading.hide();
          
            $scope.team = data.feed.entry;
          
            $scope.team = [];
          
            angular.forEach(data.feed.entry, function(value){
                
                var id = value["gsx$id"].$t,
                    index = value["gsx$index"].$t,
                    name = value["gsx$name"].$t,
                    role = value["gsx$role"].$t,
                    start = value["gsx$start"].$t,
                    duties = value["gsx$duties"].$t,
                    avatar = value["gsx$avatar"].$t,
                    image = value["gsx$image"].$t;
                
               this.push({id:id, index:index, name:name, role:role, start:start, duties:duties, avatar:avatar, image:image});
            }, $scope.team);
          
            console.log($scope.team);
          
          
            $scope.contact = [];
          
            angular.forEach(data.feed.entry, function(value){
               this.push([value["gsx$email"].$t, value["gsx$work"].$t, value["gsx$mobile"].$t, value["gsx$skype"].$t]);
            }, $scope.contact);
            
            console.log($scope.contact);
          
            }).error(function(){
          
                $ionicLoading.hide();
                console.log('Error Loading 1st Json: Getting Local Json');
                
          
                $http.get('content/team.json').success(function(data) {
                    
                    console.log(data);
                    $scope.team = data;

                    $scope.contact = [];
                    angular.forEach(data, function(value){
                       this.push(value["contact"]);
                    }, $scope.contact);


                })
      })
      /*$scope.memberNum = Number;*/
      
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
      content: '<p>Getting current location...</p>',
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
    