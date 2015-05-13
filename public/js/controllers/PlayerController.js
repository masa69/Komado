app.controller('PlayerController', function($scope, User, Player, playerControl, videoSearchBar, videoSearchList)
{
	'use strict';

	var self = this;

	self.videoSearchBar  = videoSearchBar;
	self.videoSearchList = videoSearchList;
	self.playerControl   = playerControl;

	self.init = function()
	{
		User.init();
	};

	$scope.$root.$on('user:init', function()
	{
		Player.init();
		self.videoSearchBar.init();
		self.videoSearchList.init();
	});

	$scope.$root.$on('player:init', function()
	{
		self.playerControl.init();
	});

	$scope.$root.$on('video:find', function()
	{
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});

	$scope.$root.$on('player:set:videoid', function()
	{
		self.playerControl.refreshVideoId();
	});

	$scope.$root.$on('player:set:setting', function()
	{
		self.playerControl.refreshSetting();
	});

	$scope.$on('youtube.player.ready', function($event, player)
	{
		self.playerControl.setPlayingStatus('ready');
	});

	$scope.$on('youtube.player.playing', function($event, player)
	{
		self.playerControl.setPlayingStatus('playing');
	});

	$scope.$on('youtube.player.paused', function($event, player)
	{
		self.playerControl.setPlayingStatus('paused');
	});

	$scope.$on('youtube.player.ended', function($event, player)
	{
		self.playerControl.setPlayingStatus('ended');

		if (self.playerControl.setting.loop === 1) {
			player.playVideo();
		}
	});

	self.init();
});