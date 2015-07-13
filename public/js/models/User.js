app.factory('User', function($cookies, Api)
{
	'use strict';

	var self = this;

	self.id = null;

	self.init = function()
	{
		var id = $cookies.get('userId');

		self.id = (id) ? id : null;

		if (self.id) {
			self.setId(self.id);
		}

		Api.emit('user:init');
	};

	self.signin = function(id)
	{
		if (!self.isId(id)) {
			Api.emit('user:signin:error');
			return;
		}
		self.setId(id);
		self.id = id;
		Api.emit('user:signin');
	};

	self.isId = function(id)
	{
		if (id === null || id === undefined) {
			return false;
		}
		return true;
	};

	self.setId = function(id)
	{
		$cookies.put('userId', id, {path: '/', expires: moment().add(7, 'day').format('X')});
	};

	return {
		init: function()
		{
			self.init();
		},
		id: function()
		{
			return self.id;
		},
		signin: function(id)
		{
			self.signin(id);
		}
	};
});