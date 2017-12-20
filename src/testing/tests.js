describe( 'aoContentController', function() {

	beforeEach( module('aoOnline') );

	it('should create a Portfolio with 8 entries', inject(function($controller) {
		var scope = {};
		var ctrl = $controller('PhoneListController', {$scope: scope});
		expect(scope.phones.length).toBe(8);
	}));
});