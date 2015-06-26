app.factory('userEntrance', function(User)
{
	'use strict';

	var id      = null;
	var guestId = 'guest';

	var validate = {
		id: /^[a-zA-Z0-9]+$/,
	};

	var init = function()
	{
		var id = User.id();
		this.id = (id !== guestId) ? id : null;
	};

	var signin = function()
	{
		User.signin(this.id);
	};

	var signinByGuest = function()
	{
		this.id = guestId;
		User.signin(guestId);
	};

	return {
		init          : init,
		id            : id,
		validate      : validate,
		signin        : signin,
		signinByGuest : signinByGuest,
	};
});