'use strict';

var aoOnline = angular.module('aoOnline', ['mm.foundation', 'ngRoute', 'ngResource', 'ngSanitize']);

aoOnline.config(['$routeProvider', '$locationProvider', '$httpProvider',
 	function($routeProvider, $locationProvider, $httpProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$routeProvider.when("/home", {
			templateUrl: "../templates/home.html",
			controller: "HomeCtrl"
		})
		.when("/about", {
			templateUrl: "../templates/about.html",
			controller: "AboutCtrl"
		})
		.otherwise({
			templateUrl: "../templates/404.html"
		});
	}
]);

aoOnline.controller('PortfolioCtrl', ['$scope', function($scope) {
  $scope.portfolio = [
    {
      name: 'Cruisers Yachts',
      portId: 'cy',
      desktopLink: true,
      mobileLink: true,
      liveURL: 'http://www.cruisersyachts.com'
    }, {
      name: 'Olive Barrel',
      portId: 'ob',
      desktopLink: true,
      mobileLink: true
    }, {
      name: 'Christiansen Nets',
      portId: 'cn',
      desktopLink: true,
      mobileLink: true
    }, {
      name: 'Country Inn Two Habors',
      portId: 'ci',
      desktopLink: true,
      mobileLink: true
    }, {
      name: 'Brainerd Public Schools',
      portId: 'bp',
      desktopLink: true,
      mobileLink: true
    }, {
      name: 'Off Highway',
      portId: 'oh',
      desktopLink: true,
      mobileLink: true
    }, {
      name: 'Del Zotto Products',
      portId: 'dz',
      desktopLink: true,
      mobileLink: true,
      liveURL: 'http://delzottoprecastforms.com'
    }, {
      name: 'Northland Pet Lodge',
      portId: 'np',
      desktopLink: true,
      mobileLink: true,
      liveURL: 'http://www.northlandpetlodge.com'
    }
  ];
}]);

aoOnline.controller('ModalCtrl', ['$scope', function($scope, $modal, $log) {

    $scope.open = open;

    function open(size, backdrop, itemCount, closeOnClick) {

        $scope.items = [];

        var count = itemCount || 3;

        for(var i = 0; i < count; i++){
            $scope.items.push('item ' + i);
        }

        var params = {
            templateUrl: 'myModalContent',
            resolve: {
                items: function() {
                    return $scope.items;
                },
            },
            controller: function($scope, $modalInstance, items) {

                $scope.items = items;
                $scope.selected = {
                    item: $scope.items[0],
                };

                $scope.reposition = function() {
                    $modalInstance.reposition();
                };

                $scope.ok = function() {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };

                $scope.openNested = function() {
                    open();
                };
            }
        };

        if(angular.isDefined(closeOnClick)){
            params.closeOnClick = closeOnClick;
        }

        if(angular.isDefined(size)){
            params.size = size;
        }

        if(angular.isDefined(backdrop)){
            params.backdrop = backdrop;
        }

        var modalInstance = $modal.open(params);

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

aoOnline.controller("HomeCtrl", ['$scope', function($scope){
	$scope.title = "I'm in home"
}]);
aoOnline.controller("AboutCtrl", ['$scope', function($scope){
	$scope.title = "I'm in about"
}]);

console.log('aoApp Initiated');