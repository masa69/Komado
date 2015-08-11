describe('[Module] playerOpenerMenu', function()
{
	'use strict';

	beforeEach(module('komado'));

	var playerOpenerMenu;
	var PlayerOpener;

	beforeEach(inject(
		function($injector)
		{
			playerOpenerMenu = $injector.get('playerOpenerMenu');

			PlayerOpener = $injector.get('PlayerOpener');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));



	it('init() error', inject(
		function()
		{

		}
	));

	it('init() success', inject(
		function()
		{

		}
	));



	it('open() error', inject(
		function()
		{
			playerOpenerMenu.init(null);
			playerOpenerMenu.open();

			expect(PlayerOpener.subwin()).toEqual(null);
		}
	));

	it('open() success', inject(
		function()
		{
			playerOpenerMenu.init('testUserId');
			playerOpenerMenu.open();

			expect(PlayerOpener.subwin()).not.toEqual(null);
		}
	));



	it('close() error', inject(
		function()
		{
			playerOpenerMenu.init(null);
			playerOpenerMenu.open();

			expect(PlayerOpener.subwin()).toEqual(null);

			playerOpenerMenu.close();

			expect(PlayerOpener.subwin()).toEqual(null);
		}
	));

	it('close() success', inject(
		function()
		{
			playerOpenerMenu.init('testUserId');
			playerOpenerMenu.open();

			expect(PlayerOpener.subwin()).not.toEqual(null);

			playerOpenerMenu.close();

			expect(PlayerOpener.subwin()).not.toEqual(null);
		}
	));
});