app.controller('PlayerController', function($routeParams)
{
	'use strict';

	var self = this;

	self.setting = {
		controls: 1,
		autoplay: 1,
	};

	self.id      = null;
	self.videoId = null;

	self.init = function()
	{
		angular.forEach($routeParams, function(val, key)
		{
			self[key] = val;
		});
	};

	self.init();
});