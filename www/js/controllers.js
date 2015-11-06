angular.module('starter.controllers', [])

.factory('issuesThinkCentral', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1M0sLk5iTye4pe_EyHtF5WadrK9S_h0xsiHY-uDGh2dc/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})


.factory('issuesHmof', function($http) {
    
 return{
    getIssues : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1huBXSUHO39y9WAFQagxoY8z3oiz1h9MFSc-Vx0hIXJE/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})

.factory('regularLogins', function($http) {
    
 return{
    getData : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1qaCiLfFs5zfrtsp0nyMmh00dqBizgxs6bYq9bdNQHRs/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})

.factory('escalations', function($http) {
    
 return{
    getData : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1XDqeUYIH9B95cR7jDDNpvpPlOO7jgnl_Er1JkzLJth0/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})

.factory('teamdetails', function($http) {
    
 return{
    getDetails : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1STE7s9klnWQbK9UVztpwGXYlzhPwg5dPS5EROfnZ5GY/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})

.factory('processDescriptions', function($http) {
    
 return{
    getDesc : function() {
        return $http({
            url: 'https://spreadsheets.google.com/feeds/list/1t70gDzNhHqt3COOgvxG867dPCTLXVsLyExN5pj7jg_g/od6/public/full?alt=json',
            method: 'GET'
        })
    }
 }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover, $ionicLoading) {

  /*$ionicLoading.show({
            template: '<p class="main-loader">HMH Commodity Team</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
    });*/

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
  /*$timeout(function(){

    $ionicLoading.hide();

  }, 3000)*/

  /*$ionicLoading.hide();*/
})

.controller('IssuesListCtrl', function($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $timeout, $ionicLoading, issuesThinkCentral, issuesHmof, processDescriptions) {
    
    $ionicLoading.show({
            template: '<p>Just getting the latest issues</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
    });
    
    $scope.item = {};
    
    $scope.thinkcentral = [];
    
    issuesThinkCentral.getIssues().then(function(data){
        
        var imagePath = 'https://googledrive.com/host/0B0778NZ3pAKKfmtfWGJzU0N1d1ZwRzVfckNiMjJCYnpJeFU5akE2SHEtcEhudjJKQm9iNlU/';
       
        console.log(data.data);
        
        /*$scope.images = [];*/
        
        angular.forEach(data.data.feed.entry, function(value){
            
            console.log(value);
            
                
                var issue = value["gsx$issue"].$t,
                    index = value["gsx$index"].$t,
                    cause = value["gsx$cause"].$t,
                    description = value["gsx$description"].$t,
                    jira = value["gsx$jira"].$t,
                    process = value["gsx$process"].$t,
                    thumb = imagePath + index + '/' + value["gsx$thumb"].$t,
                    imageDir = imagePath + index + '/',
                    imageArray = [],
                    text = value["gsx$text"].$t;
            
            
                for (i=1;i<6;i++){
                    
                    var url = imageDir + i + '.png';
                    
                    imageArray.push(url);
                }

                /*for (i=1;i<4;i++){
                    
                    var url = floorImageDir + i + '.png';
                    
                    imageArray.push(url);
                }*/
            
                console.log(imageArray);
            
                this.push({index:index, imageDir:imageDir, imageArray:imageArray, thumb:thumb,issue:issue, cause:cause, description:description, jira:jira, process:process, text:text});
                    
            }, $scope.thinkcentral);
        
            var tcObj = $scope.thinkcentral;
        
            localStorage.setItem('tcStorage', JSON.stringify(tcObj));

            $ionicLoading.hide();
        
            }, function(){
                console.log('Couldnt find latest Issues');
                alert('Oops cant get the latest issues from ThinkCentral at the moment. You can still view saved issues in storage.');
                $scope.thinkcentral = JSON.parse(localStorage.getItem('tcStorage')); 
                $ionicLoading.hide();
            });
    
    issuesHmof.getIssues().then(function(data){
        
        
        var imagePath = 'https://googledrive.com/host/0B0778NZ3pAKKfl9TcDlvVWdqSU5seE54WDZTX3ZTVHlNUVkyMl9RMXlBalNoVnJ4U3BuQ2M/';
        
        console.log(data);
        $scope.hmof = [];
        /*$scope.images = [];*/
        
        angular.forEach(data.data.feed.entry, function(value){
                
                var issue = value["gsx$issue"].$t,
                    index = value["gsx$index"].$t,
                    cause = value["gsx$cause"].$t,
                    description = value["gsx$description"].$t,
                    jira = value["gsx$jira"].$t,
                    process = value["gsx$process"].$t,
                    thumb = imagePath + index + '/' + value["gsx$thumb"].$t,
                    imageDir = imagePath + index + '/',
                    imageArray = [],
                    text = value["gsx$text"].$t;
            
            /*Loop thru images in directory*/
                        
                for (i=1;i<6;i++){
                    
                    var url = imageDir + i + '.png';
                    
                    imageArray.push(url);
                }
            
                console.log(imageArray);
            
                this.push({index:index, imageDir:imageDir, imageArray:imageArray, thumb:thumb,issue:issue, cause:cause, description:description, jira:jira, process:process, text:text});
            }, $scope.hmof);
        
            console.log($scope.hmof);
            var hmofObj = $scope.hmof;
        
            localStorage.setItem('hmofStorage', JSON.stringify(hmofObj));

            $ionicLoading.hide();
        
          }, function(){
                console.log('Couldnt find latest Issues');
                alert('Oops cant get the latest issues from HMOF at the moment. You can still view saved issues in storage.');
                $scope.hmof = JSON.parse(localStorage.getItem('hmofStorage')); 
                $ionicLoading.hide();
          });

    
    $scope.setItem = function(item){
        
        console.log(item);
        
        $scope.$parent.item = item;
        $scope.$parent.imageArray = item.imageArray;
        
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log('Test');
    }

    // Handle data from Process Descriptions factory

    processDescriptions.getDesc().then(function(data){

        console.log(data);
        $scope.process = [];
        /*$scope.images = [];*/
        
        angular.forEach(data.data.feed.entry, function(value){
                
                var process = value["gsx$process"].$t,
                    index = value["gsx$index"].$t,
                    description = value["gsx$description"].$t,
                    notes = value["gsx$notes"].$t;
            
                this.push({index:index, process:process, description:description, notes:notes});

            }, $scope.process);
        
            console.log($scope.process);

            var processObj = $scope.process;
        
            localStorage.setItem('processStorage', JSON.stringify(processObj));

            $ionicLoading.hide();

        }, function(){

                alert('Hmm Process Descriptions are not reachable at the moment.');
                $scope.process = JSON.parse(localStorage.getItem('processStorage')); 
                $ionicLoading.hide();

    })

    // Image Modal
    
    // Create the Image modal 
    $ionicModal.fromTemplateUrl('templates/imageModal.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

    // Triggered in the Image modal to close it
    $scope.closeImage = function() {
    $scope.modal.hide();
    };

    // Open the Image modal
    $scope.showImage = function() {
        $scope.modal.show();
        /*$timeout(function(){
          $ionicSlideBoxDelegate.update();
        }, 500);*/
       
    };

    // Description Modal
    
    // Create the Description modal 
    $ionicModal.fromTemplateUrl('templates/descriptions.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modalDesc = modal;
    });

    // Triggered in the Description modal to close it
    $scope.closeDesc = function() {
      $timeout(function(){
          $scope.modalDesc.hide();
        }, 500);
    };

    // Open the Description modal
    $scope.showDesc = function() {

        $scope.modalDesc.show();
        /*$timeout(function(){
          $ionicSlideBoxDelegate.update();
        }, 500);*/
       
    };
    
})
.controller('TeamCtrl', function ($scope, $http, $ionicPopover, $ionicLoading, teamdetails) {
    
        $ionicLoading.show({
            template: '<p>Updating some commoditys info</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
        });
    
        teamdetails.getDetails().then(function(data){
          
            console.log(data);
          
            $scope.team = [];
          
            angular.forEach(data.data.feed.entry, function(value){
                
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
          
            angular.forEach(data.data.feed.entry, function(value){
                
                var email = value["gsx$email"].$t,
                    telwork = value["gsx$work"].$t,
                    telmobile = value["gsx$mobile"].$t,
                    skype = value["gsx$skype"].$t;
                
               this.push({email:email, telwork:telwork, telmobile:telmobile, skype:skype});
            }, $scope.contact);
            
            console.log($scope.contact);

            $ionicLoading.hide();
          
            }, function(){
          
                console.log('Error Loading 1st Json: Getting Local Json');
                
          
                $http.get('content/team.json').success(function(data) {
                    
                    console.log(data);
                    $scope.team = data;

                    $scope.contact = [];
                    angular.forEach(data, function(value){
                       this.push(value["contact"]);
                    }, $scope.contact);

                    $ionicLoading.hide();

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

.controller('LoginsCtrl', ['$scope', '$http', '$timeout', '$ionicLoading', 'regularLogins', function($scope, $http, $timeout, $ionicLoading, regularLogins) {
    
    $ionicLoading.show({
            template: '<p>Just getting the latest logins</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
        });
    
    regularLogins.getData().then(function(data){
        
        console.log(data);
        $scope.loginData = [];
        
        angular.forEach(data.data.feed.entry, function(value){
                
                var description = value["gsx$description"].$t,
                    environment = value["gsx$environment"].$t,
                    url = value["gsx$url"].$t,
                    username = value["gsx$username"].$t,
                    password = value["gsx$password"].$t,
                    notes = value["gsx$notes"].$t;
            
                
               this.push({description:description, environment:environment, url:url, username:username, password:password, notes:notes});
            }, $scope.loginData);
        
            console.log($scope.loginData);

            $ionicLoading.hide();

        }, function(){
            
        });

}])

.controller('EscalationCtrl', ['$scope', '$http', '$timeout', '$ionicLoading', 'escalations', function($scope, $http, $timeout, $ionicLoading, escalations) {
    
    $ionicLoading.show({
            template: '<p>Lets update the latest escalation data</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
        });
    
    escalations.getData().then(function(data){
        
        console.log(data);
        $scope.loginData = [];
        
        angular.forEach(data.data.feed.entry, function(value){
                
                var platform = value["gsx$platform"].$t,
                    environment = value["gsx$environment"].$t,
                    initial = value["gsx$initial"].$t,
                    action = value["gsx$action"].$t,
                    escalation = value["gsx$escalation"].$t,
                    notes = value["gsx$notes"].$t;
                            
               this.push({platform:platform, environment:environment, initial:initial, action:action, escalation:escalation, notes:notes});
            }, $scope.loginData);
        
            console.log($scope.loginData);

            $ionicLoading.hide();

        }, function(){
            
        });

}])

.controller('ImageCtrl', function($scope, $ionicLoading, $timeout, $http) {

  $scope.allowSideMenu = false;

  var floorImageDir = "https://googledrive.com/host/0B0778NZ3pAKKZFpYSHdWN1MtOG8/";

  $scope.floorImageArray = [];

  for (i=1;i<4;i++){
                    
    var imageUrl = floorImageDir + i + '.svg';
                    
    $scope.floorImageArray.push(imageUrl);
  }

  console.log("Floor Image Object: " + $scope.floorImageArray);



})

.controller('MapCtrl', function($scope, $ionicLoading, $timeout) {
    
    $ionicLoading.show({
            template: '<p>Lets see where you are</p><ion-spinner icon="spiral"></ion-spinner>',
            showBackdrop: true
        });
    
    $scope.mapCreated = function(map) {
           
    $scope.map = map;
      
    var hmhloc = new google.maps.LatLng(53.343337, -6.246892);
      
    var hmhOffices = 'img/loc.svg';
        
    new google.maps.Marker({
            position: hmhloc,
            map: $scope.map,
            icon: hmhOffices,
            title: "HMH Dublin Offices"
    });
      
    $scope.map.setZoom(12);
      
    $scope.map.setCenter(hmhloc);

    $timeout(function(){

    $ionicLoading.hide();

    }, 1000);

    /*$ionicLoading.hide();*/
     
  };
    
    var defaultLatLng = new google.maps.LatLng(53.343337, -6.246892); 

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

        navigator.geolocation.getCurrentPosition(function (pos) {
        
        console.log('Got pos', pos);
        var loc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(loc);
        var infowindow = new google.maps.InfoWindow({
            content: "<span>Here you are</span>"
        });
        var location = new google.maps.Marker({
            position: loc,
            map: $scope.map
        });
        
        /*google.maps.event.addListener(location, 'click', function() {
            infowindow.open($scope.map,location);
        });*/
        $ionicLoading.hide();
        
    }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
  };
    
    function setCenter(latlng) {
        var myOptions = {
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var hmhOffices = 'img/loc.svg';
        var marker;
        marker.setMap(null);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "You are here!"
        });
        /*var marker2;
        marker2.setMap(null);
        marker2 = new google.maps.Marker({
            position: defaultLatLng,
            map: map,
            icon: hmhOffices,
            title: "PFA Ireland Offices"
        });*/
        
    }
    
    /////////////////
});
    