app.factory('componentHeader', function(User)
{
	'use strict';

	var userId = null;

	var init = function()
	{
		this.userId = User.id();
	};

	return {
		init   : init,
		userId : userId,
	};
});