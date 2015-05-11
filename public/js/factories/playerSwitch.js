app.factory('playerSwitch', function(Player, User)
{
	var init = function()
	{
		Player.setUserId(User.id());
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