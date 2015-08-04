app.factory('videoSearchList', function(Video, VideoHistory, Player)
{
	'use strict';

	var self = this;

	self.data = {
		lists : null,
		type  : 'search',
	};

	self.init = function(userId)
	{
		VideoHistory.init(userId);
	};

	self.refreshList = function()
	{
		self.data.lists = Video.lists();
	};

	self.play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	return {
		init        : self.init,
		data        : self.data,
		refreshList : self.refreshList,
		play        : self.play,
	};
});