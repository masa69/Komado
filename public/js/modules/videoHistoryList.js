app.factory('videoHistoryList', function(VideoHistory, User, Player)
{
	'use strict';

	var lists = null;
	var type  = 'history';

	var init = function()
	{
		VideoHistory.init(User.id());
	};

	var initList = function()
	{
		VideoHistory.initList();
	};

	var refreshList = function()
	{
		this.lists = VideoHistory.lists();
	};

	var play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	var remove = function(id)
	{
		var params = {
			listId : id,
		};
		VideoHistory.delete(params);
	};

	return {
		init        : init,
		initList    : initList,
		lists       : lists,
		type        : type,
		refreshList : refreshList,
		play        : play,
		remove      : remove,
	};
});