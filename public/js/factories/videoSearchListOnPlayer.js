app.factory('videoSearchListOnPlayer', function(videoSearchList, Player)
{
	'use strict';

	var self = angular.extend(this, videoSearchList);

	self.play = function(id)
	{
		Player.setVideoId(id);
	};

	return self;
});