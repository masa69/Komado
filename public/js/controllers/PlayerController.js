app.controller('PlayerController', function($scope, User, Player, playerControl, videoSearchBar, videoSearchList, videoHistoryList)
{
	'use strict';

	var self = this;

	self.videoSearchBar   = videoSearchBar;
	self.videoSearchList  = videoSearchList;
	self.videoHistoryList = videoHistoryList;
	self.playerControl    = playerControl;

	self.list = {
		search   : true,
		history  : false,
		favorite : false,
	};

	self.init = function()
	{
		User.init();
	};

	self.switchList = function(type)
	{
		angular.forEach(self.list, function(val, key)
		{
			self.list[key] = false;
		});
		self.list[type] = true;

		if (self.list.history) {
			self.videoHistoryList.initList();
		}
	};



	$scope.$root.$on('user:init', function()
	{
		Player.init();
		self.videoSearchBar.init();
		self.videoSearchList.init();
		self.videoHistoryList.init();
	});



	$scope.$root.$on('player:init', function()
	{
		self.playerControl.init();
	});

	$scope.$root.$on('player:set:setting', function()
	{
		self.playerControl.refreshSetting();
	});

	$scope.$root.$on('player:set:videoid', function()
	{
		self.playerControl.refreshVideoId();
	});



	$scope.$root.$on('video:find', function()
	{
		self.switchList('search');
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});



	$scope.$root.$on('videohistory:getlist', function()
	{
		self.videoHistoryList.refreshList();
	});

	$scope.$root.$on('videohistory:getlist:error', function()
	{

	});

	$scope.$root.$on('videohistory:add', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:add:error', function()
	{

	});

	$scope.$root.$on('videohistory:delete', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:delete:error', function()
	{

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