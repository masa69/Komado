describe('[Module] userEntrance', function()
{
	'use strict';

	beforeEach(module('komado'));

	var userEntrance;
	var User;
	var $rootScope;

	beforeEach(inject(
		function($injector)
		{
			userEntrance = $injector.get('userEntrance');

			User = $injector.get('User');

			$rootScope = $injector.get('$rootScope');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));

	it('data.guestId must be guest', inject(
		function()
		{
			expect(userEntrance.data.guestId).toEqual('guest');
		}
	));

	it('data.validate error', inject(
		function()
		{
			var userId = null;
			var ptn    = userEntrance.data.validate.id;

			userId = 'error_';
			expect(userId.match(ptn)).toEqual(null);

			userId = 'masa69@';
			expect(userId.match(ptn)).toEqual(null);

			userId = 'エラー';
			expect(userId.match(ptn)).toEqual(null);
		}
	));

	it('data.validate success', inject(
		function()
		{
			var userId = null;
			var ptn    = userEntrance.data.validate.id;

			userId = 'success';
			expect(userId.match(ptn)).not.toEqual(null);

			userId = 'masa69';
			expect(userId.match(ptn)).not.toEqual(null);
		}
	));

	it('init()', inject(
		function()
		{
			// User.id()が正しいものとして扱う
			userEntrance.init('guest');
			expect(userEntrance.data.id).toEqual(null);

			userEntrance.init('success');
			expect(userEntrance.data.id).toEqual('success');
		}
	));

	it('signin() error', inject(
		function()
		{
			var emittedUserSigninError = false;

			$rootScope.$on('user:signin:error', function()
			{
				emittedUserSigninError = true;
			});

			userEntrance.data.id = 'error_';
			userEntrance.signin();
			expect(emittedUserSigninError).toEqual(true);

			emittedUserSigninError = false;

			userEntrance.data.id = 'masa69@';
			userEntrance.signin();
			expect(emittedUserSigninError).toEqual(true);

			emittedUserSigninError = false;

			userEntrance.data.id = 'エラー';
			userEntrance.signin();
			expect(emittedUserSigninError).toEqual(true);
		}
	));

	it('signin() success', inject(
		function()
		{
			var emittedUserSigninSuccess = false;

			$rootScope.$on('user:signin', function()
			{
				emittedUserSigninSuccess = true;
			});

			userEntrance.data.id = 'success';
			userEntrance.signin();
			expect(emittedUserSigninSuccess).toEqual(true);

			emittedUserSigninSuccess = false;

			userEntrance.data.id = 'masa69';
			userEntrance.signin();
			expect(emittedUserSigninSuccess).toEqual(true);
		}
	));

	it('signinByGuest() success', inject(
		function()
		{
			var emittedUserSigninSuccess = false;

			$rootScope.$on('user:signin', function()
			{
				emittedUserSigninSuccess = true;
			});

			userEntrance.signinByGuest();
			expect(emittedUserSigninSuccess).toEqual(true);
			expect(User.id()).toEqual('guest');
		}
	));
});