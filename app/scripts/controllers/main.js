'use strict';
angular.module('beeboardApp')
    .controller('MainCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
       /* $http.get('http://10.254.0.183:4567/clients').success(function(data) {
            $scope.clients = data;
            $scope.clients.forEach(function(client){
                $http.get('http://10.254.0.183:4567/events/' + client.name).success(function(data){
                    client.events = data;
                });
            });
        });*/

//        $http.get('http://10.254.0.183:4567/events').success(function(data) {
//            $scope.events = data;
//        });
        $scope.getStyle = function(client) {
            if(typeof client.events === 'undefined') return 'badge_loading';
            if(client.events.length === 0) return 'badge_empty';
            if(client.events.length > 0) return 'badge_error';
        }

        $scope.isCritical = function (status){
            if (status==2) return true;
            else return false;
        };
        $scope.fiterServer = function (serverName){
            $scope.query = serverName;
        };

        $scope.openRegion = function(regionCode) {
            alert(regionCode);
        };
    }])
    .controller('MapCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
        $http.get('http://10.254.0.183:4567/clients').success(function(data) {
            $scope.clients = data;
            $scope.clients.forEach(function(client){
                $http.get('http://10.254.0.183:4567/events/' + client.name).success(function(data){
                    client.events = data;
                });
            });
        });

        $rootScope.regions = [
            {code:"WK", color:"#FFCCaa", long:"Западно-Казахстанская область", short:"ЗКО"},
            {code:"AR", color:"#FFCCbb", long:"Атырауская область", short:"АТЫРАУСКАЯ\nБЛАСТЬ"},
            {code:"MG", color:"#FFCCcc", long:"Мангыстауская область", short:"МАНГЫСТАУСКАЯ\nОБЛАСТЬ"},
            {code:"AT", color:"#FFCCdd", long:"Актюбинская область", short:"АКТЮБИНСКАЯ\nОБЛАСТЬ"},
            {code:"QS", color:"#FFCCee", long:"Кустанаская область", short:"КУСТАНАСКАЯ\nОБЛАСТЬ"},
            {code:"QO", color:"#FFCCff", long:"Кызылординская область", short:"КЫЗЫЛОРДИНСКАЯ\nОБЛАСТЬ"},
            {code:"QG", color:"#FFCC00", long:"Карагандинская область", short:"КАРАГАНДИНСКАЯ\nОБЛАСТЬ"},
            {code:"NK", color:"#FFCC00", long:"Северо-Казахстанская область", short:"СКО"},
            {code:"AM", color:"#FFCC00", long:"Акмолинская область", short:"АКМОЛИНСКАЯ\nОБЛАСТЬ"},
            {code:"SK", color:"#FFCC00", long:"Южно-Казахстанская область", short:"ЮКО"},
            {code:"ZM", color:"#FFCC00", long:"Жамбылская область", short:"ЖАМБЫЛСКАЯ\nОБЛАСТЬ"},
            {code:"AA", color:"#FFCC00", long:"Алматинская область", short:"АЛМАТИНСКАЯ\nОБЛАСТЬ"},
            {code:"EK", color:"#FFCC00", long:"Восточно-Казахстанская область", short:"ВКО"},
            {code:"PA", color:"#FFCC00", long:"Павлодарская область", short:"ПАВЛОДАРСКАЯ\nОБЛАСТЬ"},
        ];
        $rootScope.points = [
            {code:"AS", color:"#CCCCaa", long:"Город АСТАНА", short:"АСТАНА",radius:30},
            {code:"AC", color:"#CCCCaa", long:"Город ЛМАТЫ", short:"АЛМАТЫ",radius:20},
            {code:"BY", color:"#CCCCaa", long:"Город БАЙКОНУР", short:"БАЙКОНУР",radius:10}
        ];

        $rootScope.map = isc.kzcon.Map({
            map: "KZ",
            regions: $scope.regions,
            points: $scope.points,
            onRegionSelect: $scope.openRegion,
            renderTo: "paper",
            width: null,
            radius: 50,
            height: 500
        });

        // $('svg a').tooltip();

    }]);;

