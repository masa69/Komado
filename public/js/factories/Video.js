app.factory('Video', function(Api)
{
	'use strict';

	var self = this;

	self.lists = null;

	self.find = function(params)
	{
		Api.get('/api/youtube/find', params,
			function(data, status)
			{
				console.log(data);
			},
			function(data, status)
			{
				console.log(status);
				console.log(data);
			});
	};

	return {
		find: function(params)
		{
			self.find(params);
		},
		lists: function()
		{
			return self.lists;
		}
	};
});