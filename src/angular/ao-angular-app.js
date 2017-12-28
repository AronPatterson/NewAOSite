// MAIN ANGULAR SETUP
(function(){
	angular.module('aoOnline', [
		'mm.foundation',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngAnimate'
	])
	.constant('config', {
		shortPath: '../'
	});
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
		function aoconfig($routeProvider, $locationProvider, $httpProvider) {
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
			$locationProvider.html5Mode(false).hashPrefix('!');
			$routeProvider.when('/', {
				templateUrl: '../templates/home.html',
				controller: 'MainCtrl',
				controllerAs: 'mvm'
			})
			.when('/about', {
				templateUrl: '../templates/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'MainCtrl'
			})
			.when('/developer-portfolio', {
				templateUrl: '../templates/portfolio.html',
				controller: 'PortfolioCtrl',
				controllerAs: 'MainCtrl'
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
	.controller('MainCtrl', ['$http', 'config', MainCtrl])
	.controller('HomeCtrl', HomeCtrl)
	.controller('AboutCtrl', AboutCtrl)
	.controller('PortfolioCtrl', PortfolioCtrl)
	.controller('ModalCtrl', ModalCtrl);
	// our Main Controller holds the General Settings of ALL controllers
	function MainCtrl($http, config) {
		var mvm = this; // main view model
		mvm.shortPath = config.shortPath;
		mvm.loading = true;
		$http({
			method: 'GET',
			url: '/'
		})
		.then(successCallback, errorCallback);
		function successCallback(response){
			mvm.loading = false;
			console.log('works: ' + stringFunction(response));
		}
		function errorCallback(error){
			mvm.loading = false;
			console.log('error: ' + error);
		};
	}
	function HomeCtrl() {
		var vm = this; // view model
		vm.title = 'I\'m in home';
	}
	function AboutCtrl() {
		var vm = this; // view model
		vm.title = 'I\'m in about';
	}
	function ModalCtrl() {
		var vm = this; // view model
		vm.title = 'I\'m a Modal';
	}
	function PortfolioCtrl() {
		var vm = this; // view model
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