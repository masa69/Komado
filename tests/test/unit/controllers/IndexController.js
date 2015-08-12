describe('IndexController', function()
{
	'use strict';

	beforeEach(module('komado'));

	var IndexController;
	var $rootScope, scope;

	beforeEach(inject(
		function($injector, $controller)
		{
			$rootScope = $injector.get('$rootScope');
			scope      = $rootScope.$new();

			IndexController = $controller('IndexController', {
				$scope: scope
			});
		}
	));

	afterEach(inject(
		function()
		{

		}
	));

	it('check module componentHeader', inject(
		function()
		{
			expect(IndexController.componentHeader).not.toEqual(null);
		}
	));

	it('check module componentFooter', inject(
		function()
		{
			expect(IndexController.componentFooter).toEqual(null);
		}
	));

	it('check module userEntrance', inject(
		function()
		{
			expect(IndexController.userEntrance).not.toEqual(null);
		}
	));
});