app.factory('videoSearchList', function(Video, Player)
{
	'use strict';

	var lists  = null;

	var init = function()
	{

	};

	self.refreshList = function()
	{
		this.lists = Video.lists();
	};

	self.play = function(id)
	{
		Player.setVideoId(id);
	};

	return {
		init        : init,
		lists       : lists,
		refreshList : refreshList,
		play        : play,
	};
});