app.factory('Message', function()
{
	'use strict';

	var self = this;

	self.success = null;
	self.error   = null;

	self.setSuccess = function(mes)
	{
		self.success = mes;
	};

	self.setError = function(mes)
	{
		self.error = mes;
	};

	return {
		setSuccess: function(mes)
		{
			self.setSuccess(mes);
		},
		setError: function(mes)
		{
			self.setError(mes);
		},
		getSuccess: function()
		{
			return self.success;
		},
		getError: function()
		{
			return self.error;
		}
	};
});