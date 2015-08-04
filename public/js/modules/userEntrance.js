app.factory('userEntrance', function(User)
{
	'use strict';

	var self = this;

	self.data = {
		id       : null,
		guestId  : 'guest',
		validate : {
			id : /^[a-zA-Z0-9]+$/,
		}
	};

	self.init = function(userId)
	{
		self.data.id = (userId !== self.data.guestId) ? userId : null;
	};

	self.signin = function()
	{
		User.signin(self.data.id);
	};

	self.signinByGuest = function()
	{
		self.data.id = self.data.guestId;
		self.signin();
	};

	return {
		init          : self.init,
		data          : self.data,
		signin        : self.signin,
		signinByGuest : self.signinByGuest,
	};
});