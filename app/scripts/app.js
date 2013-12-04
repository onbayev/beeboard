'use strict';

function navController($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}

angular.module('beeboardApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/graphite', {
            templateUrl: 'views/graphs.html',
            controller: 'MainCtrl'
        })
      .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'MapCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
    }])
    .run(['$rootScope', '$http', function ($rootScope, $http, $timeout) {
        $http.get('http://10.254.0.183:4567/clients').success(function(data) {
            //console.log(data);
            $rootScope.oldevents = [];
            $rootScope.clients = data;
            setInterval(function(data) {
                $http.get('http://10.254.0.183:4567/events').success(function(data2){
                    $rootScope.events = data2;
                    $rootScope.clients.forEach(function(client){
                        var newevent = new Array();
                        data2.forEach(function(event){
                            //console.log(client.name+" "+event.client)
                            if(client.name == event.client) {
                                newevent.push(event);
                            }
                        });
                        //console.log(newevent);
                        client.events = newevent;
                    });
                    //console.log(data)
                    $rootScope.newevents = [];
                    $rootScope.resolveds = [];
                    $rootScope.events.forEach(function(event){
                        var newevent=false;
                        $rootScope.oldevents.forEach(function(oldevent){
                            if(oldevent.client==event.client && oldevent.output == event.output){
                                newevent=true;
                            }
                        });
                        if(!newevent){
                            $rootScope.newevents.push(event);
                        }
                    });
                    $rootScope.oldevents.forEach(function(oldevent){
                        var resolved=true;
                        $rootScope.events.forEach(function(event){
                            if(oldevent.client==event.client && oldevent.output == event.output){
                                resolved=false;
                            }
                        });
                        if(resolved) {
                            $rootScope.resolveds.push(oldevent);
                        }
                    });
                    $rootScope.oldevents = $rootScope.events;
                });

            },5000);
        });
    }]);
