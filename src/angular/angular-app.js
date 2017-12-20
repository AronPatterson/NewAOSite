'use strict';

var aoOnline = angular.module('aoOnline', ['mm.foundation']);

aoOnline.controller('aoContentController', ['$scope', function($scope) {
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

console.log('aoApp Initiated');