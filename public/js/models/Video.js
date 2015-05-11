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
				self.lists = data;
				Api.emit('video:find');
			},
			function(data, status)
			{
				self.lists = null;
				Api.emit('video:find:error');
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