app.controller('VideoController', function($scope, Video)
{
	'use strict';

	var self = this;

	self.sendParams = {
		kw : null,
	};
	self.lists = null;

	self.find = function()
	{
		Video.find(self.sendParams);
	};

	$scope.$root.$on('video:find:success', function()
	{
		self.lists = Video.lists();
	});
})
	.directive('videoList', function()
	{
		return {
			restrict: 'E',
			templateUrl: '/templates/video/videoList.html',
		};
	});