app.controller('UserController', function($scope, $routeParams, $window, User, Player, componentHeader, playerSwitch, videoSearchBar, videoSearchList)
{
	'use strict';

	var self = this;

	self.componentHeader = componentHeader;
	self.componentFooter = null;

	self.playerSwitch    = playerSwitch;
	self.videoSearchBar  = videoSearchBar;
	self.videoSearchList = videoSearchList;

	self.init = function()
	{
		User.init();
	};

	$scope.$root.$on('user:init', function()
	{
		if ($routeParams.userId) {
			if (!User.id()) {
				$window.location.href = '/';
				return;
			}
			if ($routeParams.userId !== User.id()) {
				$window.location.href = '/' + User.id();
				return;
			}
		}
		self.componentHeader.init();
		self.playerSwitch.init();
		self.videoSearchBar.init();
		self.videoSearchList.init();
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
		Player.open();
	});

	self.init();
});