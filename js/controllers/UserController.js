app.controller('UserController', function(
	$scope, $routeParams, $window,
	User, componentHeader, playerOpenerMenu, videoSearchBar, videoSearchList, videoHistoryList)
{
	'use strict';

	var self = this;

	self.componentHeader = componentHeader;
	self.componentFooter = null;

	self.playerOpenerMenu = playerOpenerMenu;
	self.videoSearchBar   = videoSearchBar;
	self.videoSearchList  = videoSearchList;
	self.videoHistoryList = videoHistoryList;

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
		var userId = User.id();

		if ($routeParams.userId) {
			if (!userId) {
				$window.location.href = '/';
				return;
			}
			if ($routeParams.userId !== userId) {
				User.signin($routeParams.userId);
				return;
			}
		}
		self.componentHeader.init(userId);
		self.playerOpenerMenu.init(userId);
		self.videoSearchBar.init();
		self.videoSearchList.init(userId);
		self.videoHistoryList.init(userId);
	});


	$scope.$root.$on('user:signin', function()
	{
		self.init();
	});

	$scope.$root.$on('user:signin:error', function()
	{
		// console.log('signin error');
		$window.location.href = '/';
	});


	$scope.$root.$on('video:find', function()
	{
		self.switchList('search');
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});



	$scope.$root.$on('player:set:videoid', function()
	{
		self.playerOpenerMenu.open();
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

	self.init();
});