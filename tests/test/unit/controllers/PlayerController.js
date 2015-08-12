describe('PlayerController', function()
{
	'use strict';

	beforeEach(module('komado'));

	var PlayerController;
	var $rootScope, scope;

	beforeEach(inject(
		function($injector, $controller)
		{
			$rootScope = $injector.get('$rootScope');
			scope      = $rootScope.$new();

			PlayerController = $controller('PlayerController', {
				$scope: scope
			});
		}
	));

	afterEach(inject(
		function()
		{

		}
	));

	it('check module videoSearchBar', inject(
		function()
		{
			expect(PlayerController.videoSearchBar).not.toEqual(null);
		}
	));

	it('check module videoSearchList', inject(
		function()
		{
			expect(PlayerController.videoSearchList).not.toEqual(null);
		}
	));

	it('check module videoHistoryList', inject(
		function()
		{
			expect(PlayerController.videoHistoryList).not.toEqual(null);
		}
	));

	it('check module playerControl', inject(
		function()
		{
			expect(PlayerController.playerControl).not.toEqual(null);
		}
	));

	it('switchList()', inject(
		function()
		{
			expect(PlayerController.list).toEqual({
				search   : true,
				history  : false,
				favorite : false,
			});

			PlayerController.switchList('history');
			expect(PlayerController.list).toEqual({
				search   : false,
				history  : true,
				favorite : false,
			});

			PlayerController.switchList('favorite');
			expect(PlayerController.list).toEqual({
				search   : false,
				history  : false,
				favorite : true,
			});

			PlayerController.switchList('search');
			expect(PlayerController.list).toEqual({
				search   : true,
				history  : false,
				favorite : false,
			});
		}
	));
});