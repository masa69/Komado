app.factory('Player', function($cookies, $window, Api)
{
	'use strict';

	var self = this;

	self.videoId = null;
	self.subwin  = null;
	self.setting = null;

	// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ja
	self.setting = {
		controls  : null,// 0, 1 (動画内にコントロールを表示させる)
		autoplay  : null,// 0, 1 (ページが読み込まれた時に動画を自動再生する)
		disablekb : null,// 0, 1 (動画がフォーカスされた時にキーボードでの動画操作を不可にする)
		loop      : null,// 0, 1 (動画のループ)
	};

	self.init = function()
	{
		var videoId = $cookies.get('videoId');

		self.videoId = (videoId) ? videoId : null;

		self.setting = {
			controls  : 0,
			autoplay  : 1,
			disablekb : 1,
			loop      : 1,
		};

		Api.emit('player:init');
	};

	self.open = function()
	{
		self.subwin = $window.open('/player/youtube', 'komado', 'width=150,height=400,scrollbars=yes');
	};

	self.close = function()
	{
		if (!self.subwin || self.subwin.closed) {
			return;
		}
		self.subwin.close();
		$window.alert('thanks :)');
	};

	self.setVideoId = function(id)
	{
		if (!id) {
			return;
		}

		$cookies.put('videoId', id, {path: '/', expires: moment().add(1, 'day').format('X')});

		self.videoId = id;

		Api.emit('player:set:videoid');
	};

	self.updateSetting = function(key, val)
	{
		if (self.setting[key] === 0 || self.setting[key] === 1) {
			if (val === 0 || val === 1) {
				self.setting[key] = val;
				Api.emit('player:set:setting');
			}
		}
	};

	return {
		init: function()
		{
			self.init();
		},
		setting: function()
		{
			return self.setting;
		},
		videoId: function()
		{
			return self.videoId;
		},
		setVideoId: function(id)
		{
			self.setVideoId(id);
		},
		updateSetting: function(key, val)
		{
			self.updateSetting(key, val);
		},
		open: function()
		{
			self.open();
		},
		close: function()
		{
			self.close();
		}
	};
});