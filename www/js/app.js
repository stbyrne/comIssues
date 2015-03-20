// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  
  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html",
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.team', {
    url: "/team",
    views: {
      'menuContent': {
        templateUrl: "templates/team.html",
        controller: 'TeamCtrl'
      }
    }
  })
  
  /*.state('app.team-popover', {
    url: "/team",
    views: {
      'menuContent': {
        templateUrl: "templates/team-popover.html",
        controller: 'TeamPopCtrl'
      }
    }
  })*/
  /*.state('app.platforms', {
      url: "/platforms",
      views: {
        'menuContent': {
          templateUrl: "templates/platforms.html",
          controller: 'PlatformCtrl'
        }
      }
    })*/
    .state('app.issues', {
      url: "/issues",
      views: {
        'menuContent': {
          templateUrl: "templates/issueslist.html",
          controller: 'IssuesListCtrl'
        }
      }
  })

  .state('app.single', {
    url: "/issues/:issue",
    views: {
      'menuContent': {
        templateUrl: "templates/issues.html",
        controller: 'IssuesListCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
