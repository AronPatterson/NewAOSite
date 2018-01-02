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

// FACTORIES
(function(){
	'use strict';
	angular.module('aoOnline');
});

// SERVICES
(function(){
	'use strict';
	angular.module('aoOnline')
	.service('aoGenFunctions', aoGenFunctions);
	function aoGenFunctions() {
		this.scrollToTop = function() {
			console.log('stt');
			//start at top of page
			window.scrollTo(0, 0);
			return;
		}
		this.backToTop = function() {
			console.log('btt');
			$( function(a) { // loads our Back to Top button
				// this sets up our "Back to Top" button, which will follow you only once you reach a certain point (beyond the normal page's screen height)
				var t = 300, // px height on page where it starts to show up
					n = 1200, // px height where it'll fade out
					d = 600, // default movement point
					i = a( '.backToTopBtn' ); // attaches it to the correct class
				a( window ).scroll( function() { // if you scroll, it checks to see your document height
					a( this ).scrollTop() > t ? i.addClass( 'bttVisible' ) : i.removeClass( 'bttVisible bttFadeOut' ), a( this ).scrollTop() > n && i.addClass( 'bttFadeOut' )
				}), i.on( 'click', function( t ) { // when you click it, it animates the scroll up instead of the jarring instantaneous acnhor effect
					t.preventDefault(), a( 'body,html' ).animate({ scrollTop: 0 }, d)
				});
			});
		}
	}
})();