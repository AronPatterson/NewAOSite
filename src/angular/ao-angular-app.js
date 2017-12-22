// MAIN ANGULAR SETUP
(function(){
	angular.module('aoOnline', [
		'mm.foundation',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngAnimate'
	]);
})();
function stringFunction(obj) { // for debuggin'
	return JSON.stringify(obj, null, 4);
}
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

// DIRECTIVES
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
	.factory('shortcutSettings', shortcutSettings)
	.factory('aoGenFunctions', aoGenFunctions);
	function shortcutSettings() {
		return {
			shortPath: '../'
		}
	}
	function aoGenFunctions() {
		return {}
	}
})();

// CONTROLLERS
(function(){
	'use strict';
	angular.module('aoOnline')
	.controller('MainCtrl', ['$scope', '$http', 'shortcutSettings', 'aoGenFunctions', MainCtrl])
	.controller('HomeCtrl', ['$scope', HomeCtrl])
	.controller('AboutCtrl', ['$scope', AboutCtrl])
	.controller('PortfolioCtrl', PortfolioCtrl)
	.controller('ModalCtrl', ['$scope', ModalCtrl]);
	// our Main Controller holds the General Settings of ALL controllers
	function MainCtrl($scope, $http, shortcutSettings, aoGenFunctions) {
		var vm = this;
		$scope.shortPath = shortcutSettings.shortPath;
		$scope.loading = true;
		$http.get('/')
		.then(
			function(data) {
				var stringData = stringFunction(data);
				console.log('Working: ' + stringData);
				$scope.loading = false;
			},
			function(err) {
				console.log('Error: ' + err);
				$scope.loading = false;
			}
		);
	}
	function HomeCtrl($scope) {
		$scope.title = 'I\'m in home';
	}
	function AboutCtrl($scope) {
		$scope.title = 'I\'m in about';
	}
	function ModalCtrl($scope) {
		$scope.title = 'I\'m a Modal';
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