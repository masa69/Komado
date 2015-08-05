app.factory('componentHeader', function()
{
	'use strict';

	var self = this;

	self.data = {
		userId : null,
	};

	self.init = function(userId)
	{
		self.data.userId = userId;
	};

	return {
		init : self.init,
		data : self.data,
	};
});