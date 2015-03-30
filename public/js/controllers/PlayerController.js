app.controller('PlayerController', function($routeParams)
{
	'use strict';

	var self = this;

	self.init = function()
	{
		self.params = $routeParams;
	};

	self.init();
});