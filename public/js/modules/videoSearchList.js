app.factory('videoSearchList', function(Video, VideoHistory, User, Player)
{
	'use strict';

	var lists = null;
	var type  = 'search';

	var init = function()
	{
		VideoHistory.init(User.id());
	};

	var refreshList = function()
	{
		this.lists = Video.lists();
	};

	var play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	return {
		init        : init,
		lists       : lists,
		type        : type,
		refreshList : refreshList,
		play        : play,
	};
});