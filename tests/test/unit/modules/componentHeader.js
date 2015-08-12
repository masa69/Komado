describe('[Module] componentHeader', function()
{
	'use strict';

	beforeEach(module('komado'));

	var componentHeader;

	beforeEach(inject(
		function($injector)
		{
			componentHeader = $injector.get('componentHeader');
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
			expect(componentHeader.data.userId).toEqual(null);
			var userId = null;
			componentHeader.init(userId);
			expect(componentHeader.data.userId).toEqual(null);
		}
	));

	it('init() success', inject(
		function()
		{
			expect(componentHeader.data.userId).toEqual(null);
			var userId = 'testUserId';
			componentHeader.init(userId);
			expect(componentHeader.data.userId).toEqual('testUserId');
		}
	));
});