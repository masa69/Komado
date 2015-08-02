app.factory('componentHeader', function(User)
{
	'use strict';

	var self = this;

	self.data = {
		userId : null,
	};

	self.init = function()
	{
		self.data.userId = User.id();
	};

	return {
		init : self.init,
		data : self.data,
	};
});