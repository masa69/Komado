app.controller('UserController', function($scope, $window, Komado)
{
	'use strict';

	var self = this;

	self.init = function()
	{
		self.id = null;
		self.displayId = Komado.id();
	};

	self.setId = function()
	{
		Komado.setId(self.id);
		self.init();
	};

	self.open = function()
	{
		Komado.open();
	};

	self.close = function()
	{
		Komado.close();
	};

	self.init();

	$scope.$root.$on('video:find:error', function()
	{
		$window.location.href = $window.location.href;
	});
});