app.factory('videoSearchList', function(Video, Player, User)
{
	'use strict';

	var lists  = null;

	var init = function()
	{
		Player.setUserId(User.id());
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