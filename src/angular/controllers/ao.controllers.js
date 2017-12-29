// CONTROLLERS
(function(){
	'use strict';
	angular.module('ao.controllers', [
		'ngResource',
		'ngSanitize',
		'ngAnimate',
		'mm.foundation',
		'ao.routes',
		'ao.etc'
	])
	.constant('config', {
		shortPath: '../'
	})
	.controller('MainCtrl', ['$http', 'config', MainCtrl])
	.controller('HomeCtrl', HomeCtrl)
	.controller('AboutCtrl', AboutCtrl)
	.controller('PortfolioCtrl', PortfolioCtrl)
	.controller('ContactCtrl', PortfolioCtrl)
	.controller('ModalCtrl', ['$scope', '$modal', ModalCtrl]);

	function stringFunction(obj) { // global object for debuggin'
		return JSON.stringify(obj, null, 4);
	}
	function scrollToTop() {
		window.scrollTo(0, 0);
		return;
	}
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
		$(function(){
			//start at top of page
			scrollToTop();
		});
		var vm = this; // view model
		vm.title = 'I\'m in home';
	}
	function AboutCtrl() {
		$(function(){
			//start at top of page
			scrollToTop();
		});
		var vm = this; // view model
		vm.title = 'I\'m in about';
	}
	function PortfolioCtrl() {
		$(function(){
			//start at top of page
			scrollToTop();
		});
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
	function ContactCtrl() {
		$(function(){
			//start at top of page
			scrollToTop();
		});
		var vm = this; // view model
		vm.title = 'I\'m in about';
	}
	function ModalCtrl() {
		var vm = this; // view model
		vm.title = 'I\'m a modal';
	}
})();