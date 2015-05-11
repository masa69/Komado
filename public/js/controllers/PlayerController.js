app.controller('PlayerController', function($scope, $routeParams, Player, videoSearchBar, videoSearchList)
{
	'use strict';

	var self = this;

	self.videoSearchBar  = videoSearchBar;
	self.videoSearchList = videoSearchList;

	self.setting = {
		controls: 0,
		autoplay: 1,
	};

	self.userId  = null;
	self.videoId = null;

	self.init = function()
	{
		angular.forEach($routeParams, function(val, key)
		{
			self[key] = val;
		});
	};

	$scope.$root.$on('video:find', function()
	{
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});

	$scope.$root.$on('player:set:videoid', function()
	{
		self.videoId = Player.videoId();
	});

	self.init();
});