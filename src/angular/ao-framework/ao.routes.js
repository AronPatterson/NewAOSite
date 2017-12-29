// ROUTES
(function(){
	'use strict';
	// ROUTES
	angular.module('ao.routes', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ao.controllers',
		'ao.etc'
	])
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
				controllerAs: 'MainCtrl',
				bindings: {
					portfolio: '<' // one-way binding
				}
			})
			.when('/contact', {
				templateUrl: '../templates/contact.html',
				controller: 'ContactCtrl',
				controllerAs: 'MainCtrl'
			})
			.otherwise({
				templateUrl: '../templates/404.html'
			})
		}
	]);
})();