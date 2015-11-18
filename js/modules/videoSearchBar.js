app.factory('videoSearchBar', function(Video)
{
	'use strict';

	var self = this;

	self.sendParams = {
		find : {
			kw : null,
		}
	};

	self.init = function()
	{

	};

	self.find = function()
	{
		Video.find(self.sendParams.find);
	};

	return {
		init       : self.init,
		sendParams : self.sendParams,
		find       : self.find,
	};
});