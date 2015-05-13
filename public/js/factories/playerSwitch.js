app.factory('playerSwitch', function(Player)
{
	'use strict';

	var init = function()
	{

	};

	var open = function()
	{
		Player.open();
	};

	var close = function()
	{
		Player.close();
	};

	return {
		init  : init,
		open  : open,
		close : close,
	};
});