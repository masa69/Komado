describe('[Model] User', function()
{
	'use strict';

	beforeEach(module('komado'));

	var User;
	var $rootScope, $cookies, Api;

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
	it('init()', inject(
		function()
		{
			// self.idの代入
			// $cookie.get('userId') で取得したものを self.id に代入している
			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);


			$cookies.put('userId', 'test');
			User.init();

			expect(User.id()).toEqual('test');
		}
	));

	it('signin(id)', inject(
		function()
		{
			// self.idの代入
			User.signin(null);
			expect(User.id()).toEqual(null);

			User.signin();
			expect(User.id()).toEqual(null);

			User.signin('');
			expect(User.id()).toEqual(null);

			User.signin('test');
			expect(User.id()).toEqual('test');
		}
	));
});