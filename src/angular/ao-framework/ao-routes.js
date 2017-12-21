(function(){
	angular.module('aoOnline', [
		'mm.foundation',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'ngAnimate'
	]);
})();
(function(){
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
