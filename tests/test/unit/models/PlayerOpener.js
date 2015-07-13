describe('[Model] PlayerOpener', function()
{
	'use strict';

	beforeEach(module('komado'));

	var PlayerOpener;
	var $window;

	beforeEach(inject(
		function($injector)
		{
			PlayerOpener = $injector.get('PlayerOpener');

			$window = $injector.get('$window');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));
	/**
	 * init(userId) で userId を保持する
	 */
	it('open() error', inject(
		function()
		{
			PlayerOpener.init(null);
			PlayerOpener.open();

			expect(PlayerOpener.subwin()).toEqual(null);
		}
	));

	it('open() success', inject(
		function()
		{
			PlayerOpener.init('testUserId');
			PlayerOpener.open();

			expect(PlayerOpener.subwin()).not.toEqual(null);
		}
	));



	it('close() error', inject(
		function()
		{
			PlayerOpener.init(null);
			PlayerOpener.open();

			expect(PlayerOpener.subwin()).toEqual(null);

			PlayerOpener.close();

			expect(PlayerOpener.subwin()).toEqual(null);
		}
	));

	it('close() success', inject(
		function()
		{
			PlayerOpener.init('testUserId');
			PlayerOpener.open();

			expect(PlayerOpener.subwin()).not.toEqual(null);

			PlayerOpener.close();

			expect(PlayerOpener.subwin()).not.toEqual(null);
		}
	));
});