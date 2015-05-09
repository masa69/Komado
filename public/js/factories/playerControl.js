app.factory('playerControl', function(Player)
{
	var id = null;

	var init = function()
	{
		id = null;
		self.displayId = Player.id();
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
		id    : id,
		setId : setId,
		open  : open,
		close : close
	};
});