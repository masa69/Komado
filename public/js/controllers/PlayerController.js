app.controller('PlayerController', function($routeParams, $window)
{
	'use strict';

	var self = this;

	self.id      = null;
	self.videoId = null;

	self.init = function()
	{
		var params   = $routeParams;
		angular.forEach(params, function(val, key)
		{
			self[key] = val;
		});
	};

	self.init();
});