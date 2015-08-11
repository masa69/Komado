app.factory('userEntrance', function(User)
{
	'use strict';

	var self = this;

	self.data = {
		id       : null,
		guestId  : 'guest',
		validate : User.validate,
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
		User.signin(self.data.id);
	};

	return {
		init          : self.init,
		data          : self.data,
		signin        : self.signin,
		signinByGuest : self.signinByGuest,
	};
});