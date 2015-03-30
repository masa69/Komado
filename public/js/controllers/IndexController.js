app.controller('IndexController', function($window)
{
	'use strict';

	var self = this;

	self.open = function()
	{
		$window.open('/player/test', 'test', 'width=150,height=250,scrollbars=yes');
	};

	$scope.$root.$on('video:find:error', function()
	{
		$window.location.href = $window.location.href;
	});
});