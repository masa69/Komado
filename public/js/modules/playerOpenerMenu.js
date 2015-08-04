app.factory('playerOpenerMenu', function(PlayerOpener, User)
{
	'use strict';

	var self = this;

	self.init = function(userId)
	{
		PlayerOpener.init(userId);
	};

	self.open = function()
	{
		PlayerOpener.open();
	};

	self.close = function()
	{
		PlayerOpener.close();
	};

	return {
		init  : self.init,
		open  : self.open,
		close : self.close,
	};
});