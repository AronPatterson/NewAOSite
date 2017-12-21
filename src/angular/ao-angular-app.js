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
	'use strict';
	// FACTORIES
	angular.module('aoOnline')
	.factory('GenSettings', GenSettings);
	function GenSettings() {
		return {
			shortPath : '../'
		}
	}
})();


console.log('aoApp Initiated');