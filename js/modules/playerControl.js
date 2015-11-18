app.factory('playerControl', function(Player)
{
	'use strict';

	var self = this;

	self.data = {
		videoId : null,
		playing : false,
		setting : {},
		youtube : {},
	};

	self.init = function()
	{
		self.refreshSetting();
		self.refreshVideoId();
	};

	self.refreshSetting = function()
	{
		self.data.setting = Player.setting();
	};

	self.refreshVideoId = function()
	{
		self.data.videoId = Player.videoId();
	};

	self.setPlayingStatus = function(status)
	{
		switch (status) {
			case 'ready':
			case 'playing':
				self.data.playing = true;
				break;
			case 'paused':
			case 'ended':
				self.data.playing = false;
				break;
		}
	};

	self.updateSetting = function(key, val)
	{
		Player.updateSetting(key, val);
	};

	return {
		init             : self.init,
		data             : self.data,
		updateSetting    : self.updateSetting,
		refreshSetting   : self.refreshSetting,
		refreshVideoId   : self.refreshVideoId,
		setPlayingStatus : self.setPlayingStatus,
	};
});