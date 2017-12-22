(function(){
	angular.module('aoOnline', [
		'mm.foundation',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngAnimate'
	]);
})();

// ROUTES
(function(){
	'use strict';
	// ROUTES
	angular.module('aoOnline')
	.config(['$routeProvider', '$locationProvider', '$httpProvider',
		function($routeProvider, $locationProvider, $httpProvider) {
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
			$locationProvider.html5Mode(false).hashPrefix('!');
			$routeProvider.when('/', {
				templateUrl: '../templates/home.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: '../templates/about.html',
				controller: 'AboutCtrl'
			})
			.when('/developer-portfolio', {
				templateUrl: '../templates/portfolio.html',
				controller: 'PortfolioCtrl'
			})
			.otherwise({
				templateUrl: '../templates/404.html'
			})
		}
	]);
})();

// LOADER
(function(){
	'use strict';

	angular.module('aoOnline')
	.directive('loadOverlay', loadOverlay);
	function loadOverlay() {
		return {
			restrict: 'E',
			replace: true,
			template: '<div class="loading" style="background-color: #000; z-index: 999;"><img src="../img/svg-loader.svg" width="20" height="20" />LOADING...</div>',
			link: function (scope, element, attr) {
				scope.$watch('loading', function (val) {
					if (val) {
						elm.show();
					} else {
						elm.hide();
					}
				});
			}
		}
	}

})();



// FACTORIES
(function(){
	'use strict';
	angular.module('aoOnline')
	.factory('genSettings', genSettings);
	function genSettings() {
		return {
			shortPath: '../'
		}
	}
})();

// CONTROLLERS
(function(){
	'use strict';
	angular.module('aoOnline')
	.controller('MainCtrl', ['$scope', '$http', MainCtrl])
	.controller('HomeCtrl', HomeCtrl)
	.controller('AboutCtrl', AboutCtrl)
	.controller('PortfolioCtrl', PortfolioCtrl)
	.controller('ModalCtrl', ModalCtrl);

	function MainCtrl($scope, $http) {
		var vm = this; // view model
		vm.loading = true;
		$http.get('/')
		.then(
			function(data) {
				console.log('Working: ' + data);
				vm.loading = false;
			},
			function(err) {
				console.log('Error: ' + err);
				vm.loading = false;
			}
		);
	}
	function HomeCtrl() {
		var vm = this;
		vm.title = 'I\'m in home';
	}
	function AboutCtrl() {
		var vm = this;
		vm.title = 'I\'m in about';
	}
	function ModalCtrl() {
		var vm = this;
		vm.title = 'I\'m in about';
	}
	function PortfolioCtrl() {
		var vm = this;
		vm.portfolio = [{
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
		}];
	}
})();

console.log('aoApp Initiated');