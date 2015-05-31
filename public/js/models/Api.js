app.factory('Api', function($rootScope, $http, $templateCache, Message)
{
	'use strict';

	var self = this;

	self.emit = function(name)
	{
		$rootScope.$emit(name);
	};

	self.http = function(method, url, params, success, error)
	{
		var sendParams = (params) ? params : {};
		//console.log(sendParams);
		switch (method) {
			case 'FILES':
				self.fileUploader(url, params, success, error);
				break;
			case 'POST':
				self.post(url, sendParams, success, error);
				break;
			case 'GET':
				$http({
					method: method, url: url, params: sendParams, cache: $templateCache,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(success).error(error);
				break;
		}
	};

	self.fileUploader = function(uploadType, file, success, error)
	{
		var url = '/api/file/upload/' + uploadType;
		var params = new FormData();
		params.append('uploadfile', file);
		$http({
			method: 'POST', url: url, data: params,
			withCredentials: true,
            headers: {'Content-Type': undefined },
			cache: $templateCache,
			transformRequest: angular.identity
		}).success(success).error(error);
	};

	self.post = function(url, sendParams, success, error)
	{
		var params = new FormData();
		angular.forEach(sendParams, function(val, key)
		{
			if (val) {
				params.append(key, val);
			}
		});
		$http({
			method: 'POST', url: url, data: params, cache: $templateCache,
			headers: {'Content-Type': undefined },
			withCredentials: true, transformRequest: angular.identity
		}).success(success).error(error);
	};

	return {
		get: function(url, params, success, error)
		{
			self.http('GET', url, params, success, error);
		},
		post: function(url, params, success, error)
		{
			self.http('POST', url, params, success, error);
		},
		upload: function(uploadType, file, success, error)
		{
			self.http('FILES', uploadType, file, success, error);
		},
		emit: function(name)
		{
			self.emit(name);
		},
		successMessage: function(mes)
		{
			Message.setSuccess(mes);
			self.emit('message:success');
		},
		errorMessage: function(mes)
		{
			Message.setError(mes);
			self.emit('message:error');
		},
		loadingStart: function()
		{
			self.emit('loading:start');
		},
		loadingFinish: function()
		{
			self.emit('loading:finish');
		}
	};
});