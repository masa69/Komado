app.controller('IndexController', function($scope, $window, User, componentHeader, userEntrance)
{
	'use strict';

	var self = this;

	self.componentHeader = componentHeader;
	self.componentFooter = null;

	self.userEntrance = userEntrance;

	self.init = function()
	{
		User.init();
	};



	$scope.$root.$on('user:init', function()
	{
		self.componentHeader.init();
		self.userEntrance.init();
	});

	$scope.$root.$on('user:signin', function()
	{
		$window.location.href = '/' + User.id();
	});

	$scope.$root.$on('user:signin:error', function()
	{
		// $window.location.href = '/' + User.id();
	});

	self.init();
});