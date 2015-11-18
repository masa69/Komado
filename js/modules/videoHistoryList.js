app.factory('videoHistoryList', function(VideoHistory, Player)
{
	'use strict';

	var self = this;

	self.data = {
		lists : null,
		type  : 'history',
	};

	self.init = function(userId)
	{
		VideoHistory.init(userId);
	};

	self.initList = function()
	{
		VideoHistory.initList();
	};

	self.refreshList = function()
	{
		self.data.lists = VideoHistory.lists();
	};

	self.play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	self.remove = function(id)
	{
		var params = {
			listId : id,
		};
		VideoHistory.delete(params);
	};

	return {
		init        : self.init,
		initList    : self.initList,
		data        : self.data,
		refreshList : self.refreshList,
		play        : self.play,
		remove      : self.remove,
	};
});