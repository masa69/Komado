describe('UserController', function()
{
	'use strict';

	beforeEach(module('komado'));

	var UserController;
	var $rootScope, scope;

	beforeEach(inject(
		function($injector, $controller)
		{
			$rootScope = $injector.get('$rootScope');
			scope      = $rootScope.$new();

			UserController = $controller('UserController', {
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
			expect(UserController.componentHeader).not.toEqual(null);
		}
	));

	it('check module componentFooter', inject(
		function()
		{
			expect(UserController.componentFooter).toEqual(null);
		}
	));

	it('check module playerOpenerMenu', inject(
		function()
		{
			expect(UserController.playerOpenerMenu).not.toEqual(null);
		}
	));

	it('check module videoSearchBar', inject(
		function()
		{
			expect(UserController.videoSearchBar).not.toEqual(null);
		}
	));

	it('check module videoSearchList', inject(
		function()
		{
			expect(UserController.videoSearchList).not.toEqual(null);
		}
	));

	it('check module videoHistoryList', inject(
		function()
		{
			expect(UserController.videoHistoryList).not.toEqual(null);
		}
	));

	it('switchList()', inject(
		function()
		{
			expect(UserController.list).toEqual({
				search   : true,
				history  : false,
				favorite : false,
			});

			UserController.switchList('history');
			expect(UserController.list).toEqual({
				search   : false,
				history  : true,
				favorite : false,
			});

			UserController.switchList('favorite');
			expect(UserController.list).toEqual({
				search   : false,
				history  : false,
				favorite : true,
			});

			UserController.switchList('search');
			expect(UserController.list).toEqual({
				search   : true,
				history  : false,
				favorite : false,
			});
		}
	));
});