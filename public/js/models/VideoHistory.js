app.factory('VideoHistory', function(Api)
{
	'use strict';

	var self = this;

	self.lists = null;
	self.userId = null;

	self.getList = function()
	{
		var params = {};

		if (!self.userId) {
			Api.emit('videohistory:getlist:error');
			return;
		}

		Api.get('/api/youtube/history/get/' + self.userId, params,
			function(res, status)
			{
				self.lists = res.data;
				Api.emit('videohistory:getlist');
			},
			function(res, status)
			{
				self.lists = null;
				Api.emit('videohistory:getlist:error');
			});
	};

	self.add = function(params)
	{
		if (!self.userId) {
			Api.emit('videohistory:add:error');
			return;
		}
		Api.post('/api/youtube/history/add/' + self.userId, params,
			function(res, status)
			{
				Api.emit('videohistory:add');
			},
			function(res, status)
			{
				Api.emit('videohistory:add:error');
			});
	};

	self.delete = function(params)
	{
		if (!self.userId) {
			Api.emit('videohistory:delete:error');
			return;
		}
		Api.post('/api/youtube/history/delete/' + self.userId, params,
			function(res, status)
			{
				Api.emit('videohistory:delete');
			},
			function(res, status)
			{
				Api.emit('videohistory:delete:error');
			});
	};

	self.setUserId = function(userId)
	{
		self.userId = userId;
	};

	return {
		init: function(userId)
		{
			self.setUserId(userId);
		},
		initList: function()
		{
			self.getList();
		},
		add: function(params)
		{
			self.add(params);
		},
		delete: function(params)
		{
			self.delete(params);
		},
		lists: function()
		{
			return self.lists;
		}
	};
});