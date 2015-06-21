app.factory('Video', function(Api)
{
	'use strict';

	var self = this;

	self.lists = null;

	self.find = function(params)
	{
		Api.get('/api/youtube/find', params,
			function(res, status)
			{
				self.lists = res.data;
				Api.emit('video:find');
			},
			function(res, status)
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