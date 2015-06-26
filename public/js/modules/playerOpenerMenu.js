app.factory('playerOpenerMenu', function(PlayerOpener, User)
{
	'use strict';

	var init = function()
	{
		PlayerOpener.init(User.id());
	};

	var open = function()
	{
		PlayerOpener.open();
	};

	var close = function()
	{
		PlayerOpener.close();
	};

	return {
		init  : init,
		open  : open,
		close : close,
	};
});