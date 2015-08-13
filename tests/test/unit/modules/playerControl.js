describe('[Module] playerControl', function()
{
	'use strict';

	beforeEach(module('komado'));

	var playerControl;
	var Player;
	var $cookies;

	beforeEach(inject(
		function($injector)
		{
			playerControl = $injector.get('playerControl');

			Player = $injector.get('Player');

			$cookies = $injector.get('$cookies');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));

	it('init(), i dont have videoId', inject(
		function()
		{
			$cookies.remove('videoId');

			expect(playerControl.data.videoId).toEqual(null);
			expect(playerControl.data.setting).toEqual({});

			playerControl.init();

			expect(playerControl.data.videoId).toEqual(null);
			expect(playerControl.data.setting).toEqual({
				controls  : null,
				autoplay  : null,
				disablekb : null,
				loop      : null,
			});

			Player.init();
			playerControl.init();

			expect(playerControl.data.videoId).toEqual(null);
			expect(playerControl.data.setting).toEqual({
				controls  : 0,
				autoplay  : 1,
				disablekb : 1,
				loop      : 1,
			});
		}
	));

	it('init(), i have videoId', inject(
		function()
		{
			var videoId = 'youtubeVideoId';

			$cookies.put('videoId', videoId);

			expect(playerControl.data.videoId).toEqual(null);
			expect(playerControl.data.setting).toEqual({});

			Player.init();
			playerControl.init();

			expect(playerControl.data.videoId).toEqual(videoId);
			expect(playerControl.data.setting).toEqual({
				controls  : 0,
				autoplay  : 1,
				disablekb : 1,
				loop      : 1,
			});
		}
	));

	it('updateSetting()', inject(
		function()
		{
			Player.init();
			playerControl.init();

			expect(playerControl.data.setting).toEqual({
				controls  : 0,
				autoplay  : 1,
				disablekb : 1,
				loop      : 1,
			});

			playerControl.updateSetting('controls', 1);
			playerControl.updateSetting('autoplay', 0);
			playerControl.updateSetting('disablekb', 0);
			playerControl.updateSetting('loop', 0);

			expect(playerControl.data.setting).toEqual({
				controls  : 1,
				autoplay  : 0,
				disablekb : 0,
				loop      : 0,
			});
		}
	));

	it('setPlayingStatus()', inject(
		function()
		{
			expect(playerControl.data.playing).toEqual(false);

			playerControl.setPlayingStatus('ready');
			expect(playerControl.data.playing).toEqual(true);

			playerControl.data.playing = false;

			playerControl.setPlayingStatus('playing');
			expect(playerControl.data.playing).toEqual(true);

			playerControl.data.playing = false;

			playerControl.setPlayingStatus('paused');
			expect(playerControl.data.playing).toEqual(false);

			playerControl.setPlayingStatus('ended');
			expect(playerControl.data.playing).toEqual(false);
		}
	));
});