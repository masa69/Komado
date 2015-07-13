describe('[Model] User', function()
{
	'use strict';

	beforeEach(module('komado'));

	var User;
	var $cookies, Api;

	beforeEach(inject(
		function($injector)
		{
			User = $injector.get('User');

			$cookies = $injector.get('$cookies');
			Api      = $injector.get('Api');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));
	/**
	 * User.id() は self.id を返す
	 */
	it('init() error', inject(
		function()
		{
			expect(User.id()).toEqual(null);
			// $cookie.get('userId') で取得したものを self.id に代入している
			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);
		}
	));

	it('init() success', inject(
		function()
		{
			expect(User.id()).toEqual(null);

			$cookies.remove('userId');
			$cookies.put('userId', 'testUserId');
			User.init();

			expect(User.id()).toEqual('testUserId');
		}
	));



	it('signin(id) error', inject(
		function()
		{
			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);

			User.signin(null);
			expect(User.id()).toEqual(null);

			User.signin();
			expect(User.id()).toEqual(null);

			User.signin('');
			expect(User.id()).toEqual(null);
		}
	));

	it('signin(id) success', inject(
		function()
		{
			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);

			User.signin('testUserId');
			expect(User.id()).toEqual('testUserId');
		}
	));
});