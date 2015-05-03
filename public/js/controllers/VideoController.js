app.controller('VideoController', function($scope, Video, Komado)
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

	self.play = function(id)
	{
		Komado.play(id);
	};

	$scope.$root.$on('video:find:success', function()
	{
		self.lists = Video.lists();
	});
})
	.directive('videoSearchBar', function()
	{
		return {
			restrict: 'E',
			templateUrl: '/templates/video/videoSearchBar.html',
		};
	})
	.directive('videoList', function()
	{
		return {
			restrict: 'E',
			templateUrl: '/templates/video/videoList.html',
		};
	});