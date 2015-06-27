app.factory('playerControl', function(Player)
{
	'use strict';

	var videoId = null;
	var playing = false;
	var setting = {};
	var youtube = {};

	var init = function()
	{
		this.refreshSetting();
		this.refreshVideoId();
	};

	var refreshSetting = function()
	{
		this.setting = Player.setting();
	};

	var refreshVideoId = function()
	{
		this.videoId = Player.videoId();
	};

	var setPlayingStatus = function(status)
	{
		switch (status) {
			case 'ready':
			case 'playing':
				this.playing = true;
				break;
			case 'paused':
			case 'ended':
				this.playing = false;
				break;
		}
	};

	var updateSetting = function(key, val)
	{
		Player.updateSetting(key, val);
	};

	return {
		init          : init,
		videoId       : videoId,
		playing       : playing,
		setting       : setting,
		youtube       : youtube,
		updateSetting : updateSetting,
		refreshSetting   : refreshSetting,
		refreshVideoId   : refreshVideoId,
		setPlayingStatus : setPlayingStatus,
	};
});