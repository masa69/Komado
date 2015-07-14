describe('[Model] User', function()
{
	'use strict';

	beforeEach(module('komado'));

	var User;
	var $cookies, Api;
	var $rootScope;

	beforeEach(inject(
		function($injector)
		{
			User = $injector.get('User');

			$cookies = $injector.get('$cookies');
			Api      = $injector.get('Api');

			$rootScope = $injector.get('$rootScope');
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
			var emittedUserInit = false;

			$rootScope.$on('user:init', function()
			{
				emittedUserInit = true;
			});

			expect(User.id()).toEqual(null);
			// $cookie.get('userId') で取得したものを self.id に代入している
			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);

			expect(emittedUserInit).toEqual(true);
		}
	));

	it('init() success', inject(
		function()
		{
			var emittedUserInit = false;

			$rootScope.$on('user:init', function()
			{
				emittedUserInit = true;
			});

			expect(User.id()).toEqual(null);

			$cookies.remove('userId');
			$cookies.put('userId', 'testUserId');
			User.init();

			expect(User.id()).toEqual('testUserId');

			expect(emittedUserInit).toEqual(true);
		}
	));



	it('signin(id) error', inject(
		function()
		{
			var emittedUserInit        = false;
			var emittedUserSignin      = false;
			var emittedUserSigninError = false;

			$rootScope.$on('user:init', function()
			{
				emittedUserInit = true;
			});

			$rootScope.$on('user:signin', function()
			{
				emittedUserSignin = true;
			});

			$rootScope.$on('user:signin:error', function()
			{
				emittedUserSigninError = true;
			});


			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);

			expect(emittedUserInit).toEqual(true);


			User.signin(null);
			expect(User.id()).toEqual(null);

			expect(emittedUserSignin).not.toEqual(true);
			expect(emittedUserSigninError).toEqual(true);
			emittedUserSignin      = false;
			emittedUserSigninError = false;


			User.signin();
			expect(User.id()).toEqual(null);

			expect(emittedUserSignin).not.toEqual(true);
			expect(emittedUserSigninError).toEqual(true);
			emittedUserSignin      = false;
			emittedUserSigninError = false;


			User.signin('');
			expect(User.id()).toEqual(null);

			expect(emittedUserSignin).not.toEqual(true);
			expect(emittedUserSigninError).toEqual(true);
		}
	));

	it('signin(id) success', inject(
		function()
		{
			var emittedUserInit        = false;
			var emittedUserSignin      = false;
			var emittedUserSigninError = false;

			$rootScope.$on('user:init', function()
			{
				emittedUserInit = true;
			});

			$rootScope.$on('user:signin', function()
			{
				emittedUserSignin = true;
			});

			$rootScope.$on('user:signin:error', function()
			{
				emittedUserSigninError = true;
			});


			$cookies.remove('userId');
			User.init();

			expect(User.id()).toEqual(null);

			expect(emittedUserInit).toEqual(true);


			User.signin('testUserId');
			expect(User.id()).toEqual('testUserId');

			expect(emittedUserSignin).toEqual(true);
			expect(emittedUserSigninError).not.toEqual(true);
		}
	));
});