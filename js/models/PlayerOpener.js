app.factory('PlayerOpener', function($window)
{
	'use strict';

	var self = this;

	self.subwin = null;
	self.userId = null;

	self.open = function(userId)
	{
		if (!self.userId) {
			return;
		}
		// console.log(screen);
		self.subwin = $window.open('/player/' + self.userId + '/youtube', 'komado', 'width=150,height=' + screen.availHeight + ',top=0,left=0,scrollbars=yes,menubar=no,toolbar=no,location=no,directories=no,status=no');
	};

	self.close = function()
	{
		if (!self.subwin || self.subwin.closed) {
			return;
		}
		self.subwin.close();
		$window.alert('thanks :)');
	};

	self.setUserId = function(userId)
	{
		self.userId = userId;
	};

	return {
		init: function(userId)
		{
			self.setUserId(userId);
		},
		open: function()
		{
			self.open();
		},
		close: function()
		{
			self.close();
		},
		subwin: function()
		{
			return self.subwin;
		}
	};
});