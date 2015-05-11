app.factory('Player', function(Api, $window)
{
	'use strict';

	var self = this;

	self.userId  = null;
	self.videoId = null;
	self.subwin  = null;

	self.open = function()
	{
		if (!self.userId) {
			return;
		}
		self.subwin = $window.open('/player/' + self.userId + '/' + self.videoId, 'komado', 'width=150,height=400,scrollbars=yes');
	};

	self.close = function()
	{
		if (!self.subwin || self.subwin.closed) {
			return;
		}
		self.subwin.close();
		$window.alert('thanks :)');
	};

	self.setUserId = function(id)
	{
		if (id) {
			self.userId = id;
		}
	};

	self.setVideoId = function(id)
	{
		if (id) {
			self.videoId = id;
			Api.emit('player:set:videoid');
		}
	};

	return {
		videoId: function()
		{
			return self.videoId;
		},
		setUserId: function(id)
		{
			self.setUserId(id);
		},
		setVideoId: function(id)
		{
			self.setVideoId(id);
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