describe('[Model] Player', function()
{
	'use strict';

	beforeEach(module('komado'));

	var Player;
	var $cookies, Api;
	var $rootScope;

	beforeEach(inject(
		function($injector)
		{
			Player = $injector.get('Player');

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
	 * init(userId) で userId を保持する
	 */
	it('init() error', inject(
		function()
		{
			var setting = Player.setting();

			var emittedPlayerInit = false;

			$rootScope.$on('player:init', function()
			{
				emittedPlayerInit = true;
			});

			expect(Player.videoId()).toEqual(null);

			expect(setting.controls).toEqual(null);
			expect(setting.autoplay).toEqual(null);
			expect(setting.disablekb).toEqual(null);
			expect(setting.loop).toEqual(null);

			$cookies.remove('videoId');
			Player.init();

			setting = Player.setting();

			expect(Player.videoId()).toEqual(null);

			expect(setting.controls).toEqual(0);
			expect(setting.autoplay).toEqual(1);
			expect(setting.disablekb).toEqual(1);
			expect(setting.loop).toEqual(1);

			expect(emittedPlayerInit).toEqual(true);
		}
	));

	it('init() success', inject(
		function()
		{
			var setting = Player.setting();

			var emittedPlayerInit = false;

			$rootScope.$on('player:init', function()
			{
				emittedPlayerInit = true;
			});

			expect(Player.videoId()).toEqual(null);

			expect(setting.controls).toEqual(null);
			expect(setting.autoplay).toEqual(null);
			expect(setting.disablekb).toEqual(null);
			expect(setting.loop).toEqual(null);

			$cookies.remove('videoId');
			$cookies.put('videoId', 'myVideoId');
			Player.init();

			setting = Player.setting();

			expect(Player.videoId()).toEqual('myVideoId');

			expect(setting.controls).toEqual(0);
			expect(setting.autoplay).toEqual(1);
			expect(setting.disablekb).toEqual(1);
			expect(setting.loop).toEqual(1);

			expect(emittedPlayerInit).toEqual(true);
		}
	));



	it('setVideoId(), videoId() error', inject(
		function()
		{
			var emittedPlayerSetVideoId = false;

			$rootScope.$on('player:set:videoid', function()
			{
				emittedPlayerSetVideoId = true;
			});

			expect(Player.videoId()).toEqual(null);

			$cookies.remove('videoId');

			Player.init();
			expect(Player.videoId()).toEqual(null);

			Player.setVideoId(null);
			expect(Player.videoId()).toEqual(null);

			Player.setVideoId('');
			expect(Player.videoId()).toEqual(null);

			expect(emittedPlayerSetVideoId).toEqual(false);
		}
	));

	it('setVideoId(), videoId() success', inject(
		function()
		{
			var emittedPlayerSetVideoId = false;

			$rootScope.$on('player:set:videoid', function()
			{
				emittedPlayerSetVideoId = true;
			});

			expect(Player.videoId()).toEqual(null);

			$cookies.remove('videoId');

			Player.init();
			expect(Player.videoId()).toEqual(null);

			Player.setVideoId('myVideoId');
			expect(Player.videoId()).toEqual('myVideoId');

			expect(emittedPlayerSetVideoId).toEqual(true);
		}
	));



	it('updateSetting(), setting() error', inject(
		function()
		{
			Player.init();

			var setting = Player.setting();

			expect(setting.controls).toEqual(0);
			expect(setting.autoplay).toEqual(1);
			expect(setting.disablekb).toEqual(1);
			expect(setting.loop).toEqual(1);

			Player.updateSetting('controls', 2);
			expect(setting.controls).not.toEqual(2);

			Player.updateSetting('autoplay', 'play');
			expect(setting.autoplay).not.toEqual('play');

			Player.updateSetting('disablekb', -1);
			expect(setting.disablekb).not.toEqual(-1);

			Player.updateSetting('loop', false);
			expect(setting.loop).not.toEqual(false);
		}
	));

	it('updateSetting(), setting() success', inject(
		function()
		{
			Player.init();

			var setting = Player.setting();

			expect(setting.controls).toEqual(0);
			expect(setting.autoplay).toEqual(1);
			expect(setting.disablekb).toEqual(1);
			expect(setting.loop).toEqual(1);

			Player.updateSetting('controls', 1);
			expect(setting.controls).toEqual(1);

			Player.updateSetting('autoplay', 0);
			expect(setting.autoplay).toEqual(0);

			Player.updateSetting('disablekb', 0);
			expect(setting.disablekb).toEqual(0);

			Player.updateSetting('loop', 0);
			expect(setting.loop).toEqual(0);
		}
	));
});