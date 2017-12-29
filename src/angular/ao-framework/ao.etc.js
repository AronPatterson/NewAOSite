// DIRECTIVES
(function(){
	'use strict';
	angular.module('ao.etc', [
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'mm.foundation',
		'ao.controllers',
		'ao.etc'
	])
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

// SERVICES
(function(){
	'use strict';
	angular.module('aoOnline');
});

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