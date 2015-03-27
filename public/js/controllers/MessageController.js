app.controller('MessageController', function($scope, $timeout, Message)
{
	'use strict';

	var self = this;

	self.hide = true;

	self.init = function()
	{
		self.appear  = false;
		self.success = null;
		self.error   = null;
	};

	self.setSuccess = function(mes)
	{
		self.toaster();
		self.success = mes;
	};

	self.setError = function(mes)
	{
		self.toaster();
		self.error = mes;
	};

	self.toaster = function()
	{
		self.init();
		self.appear = true;
		$timeout(function()
		{
			self.init();
		}, 2000);
	};

	self.removeHide = function()
	{
		$timeout(function()
		{
			self.hide = false;
		}, 3000);
	};

	self.init();
	self.removeHide();

	$scope.$root.$on('message:success', function()
	{
		self.setSuccess(Message.getSuccess());
	});

	$scope.$root.$on('message:error', function()
	{
		self.setError(Message.getError());
	});
});