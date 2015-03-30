app.factory('Komado', function($window)
{
	'use strict';

	var self = this;

	self.id      = 'demo';
	self.videoId = '';
	self.subwin  = null;

	self.open = function(id, videoId)
	{
		self.subwin = $window.open('/player/' + self.id + '/' + self.videoId, 'komado', 'width=150,height=250,scrollbars=yes');
	};

	self.close = function(id, videoId)
	{
		if (!self.subwin || self.subwin.closed) {
			return;
		}
		self.subwin.close();
		$window.alert('thanks :)');
	};

	self.setId = function(id)
	{
		if (id) {
			self.id = id;
		}
	};

	self.setVideoId = function(id)
	{
		if (id) {
			self.videoId = id;
		}
	};

	return {
		id: function()
		{
			return self.id;
		},
		videoId: function()
		{
			return self.videoId;
		},
		setId: function(id)
		{
			self.setId(id);
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
		},
		play: function(id)
		{
			self.setVideoId(id);
			self.open();
		}
	};
});