var app = angular.module('komado', ['ngSanitize', 'ngAnimate', 'ngRoute', 'ngCookies', 'ngMessages', 'angularMoment', 'youtube-embed']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'page',
		})
		.when('/player/:userId/:videoType', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		})
		.when('/:userId', {
			templateUrl: '/templates/views/user.html',
			controller: 'UserController',
			controllerAs: 'page',
		});
	// $locationProvider.html5Mode(true);
	$locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: false });
}]);
app.controller('IndexController', function($scope, $window, User, componentHeader, userEntrance)
{
	'use strict';

	var self = this;

	self.componentHeader = componentHeader;
	self.componentFooter = null;

	self.userEntrance = userEntrance;

	self.init = function()
	{
		User.init();
	};



	$scope.$root.$on('user:init', function()
	{
		var userId = User.id();
		self.componentHeader.init(userId);
		self.userEntrance.init(userId);
	});

	$scope.$root.$on('user:signin', function()
	{
		$window.location.href = '/' + User.id();
	});

	$scope.$root.$on('user:signin:error', function()
	{

	});

	self.init();
});
app.controller('PlayerController', function($scope, $routeParams, User, Player, playerControl, videoSearchBar, videoSearchList, videoHistoryList)
{
	'use strict';

	var self = this;

	self.videoSearchBar   = videoSearchBar;
	self.videoSearchList  = videoSearchList;
	self.videoHistoryList = videoHistoryList;
	self.playerControl    = playerControl;

	self.list = {
		search   : true,
		history  : false,
		favorite : false,
	};

	self.isError = false;

	self.init = function()
	{
		User.init();
	};

	self.switchList = function(type)
	{
		angular.forEach(self.list, function(val, key)
		{
			self.list[key] = false;
		});
		self.list[type] = true;

		if (self.list.history) {
			self.videoHistoryList.initList();
		}
	};



	$scope.$root.$on('user:init', function()
	{
		var userId = User.id();

		if ($routeParams.userId) {
			if (!userId || $routeParams.userId !== userId) {
				// self.isError = true;
				User.signin($routeParams.userId);
				return;
			}
		} else {
			self.isError = true;
		}
		Player.init();
		self.videoSearchBar.init();
		self.videoSearchList.init(userId);
		self.videoHistoryList.init(userId);
	});

	$scope.$root.$on('user:signin', function()
	{
		self.init();
	});



	$scope.$root.$on('player:init', function()
	{
		self.playerControl.init();
	});

	$scope.$root.$on('player:set:videoid', function()
	{
		self.playerControl.refreshVideoId();
	});



	$scope.$root.$on('video:find', function()
	{
		self.switchList('search');
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});



	$scope.$root.$on('videohistory:getlist', function()
	{
		self.videoHistoryList.refreshList();
	});

	$scope.$root.$on('videohistory:getlist:error', function()
	{

	});

	$scope.$root.$on('videohistory:add', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:add:error', function()
	{

	});

	$scope.$root.$on('videohistory:delete', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:delete:error', function()
	{

	});



	$scope.$on('youtube.player.ready', function($event, player)
	{
		self.playerControl.setPlayingStatus('ready');
	});

	$scope.$on('youtube.player.playing', function($event, player)
	{
		self.playerControl.setPlayingStatus('playing');
	});

	$scope.$on('youtube.player.paused', function($event, player)
	{
		self.playerControl.setPlayingStatus('paused');
	});

	$scope.$on('youtube.player.ended', function($event, player)
	{
		self.playerControl.setPlayingStatus('ended');

		if (self.playerControl.data.setting.loop === 1) {
			player.playVideo();
		}
	});

	self.init();
});
app.controller('UserController', function(
	$scope, $routeParams, $window,
	User, componentHeader, playerOpenerMenu, videoSearchBar, videoSearchList, videoHistoryList)
{
	'use strict';

	var self = this;

	self.componentHeader = componentHeader;
	self.componentFooter = null;

	self.playerOpenerMenu = playerOpenerMenu;
	self.videoSearchBar   = videoSearchBar;
	self.videoSearchList  = videoSearchList;
	self.videoHistoryList = videoHistoryList;

	self.list = {
		search   : true,
		history  : false,
		favorite : false,
	};

	self.init = function()
	{
		User.init();
	};

	self.switchList = function(type)
	{
		angular.forEach(self.list, function(val, key)
		{
			self.list[key] = false;
		});
		self.list[type] = true;

		if (self.list.history) {
			self.videoHistoryList.initList();
		}
	};



	$scope.$root.$on('user:init', function()
	{
		var userId = User.id();

		if ($routeParams.userId) {
			if (!userId) {
				$window.location.href = '/';
				return;
			}
			if ($routeParams.userId !== userId) {
				User.signin($routeParams.userId);
				return;
			}
		}
		self.componentHeader.init(userId);
		self.playerOpenerMenu.init(userId);
		self.videoSearchBar.init();
		self.videoSearchList.init(userId);
		self.videoHistoryList.init(userId);
	});


	$scope.$root.$on('user:signin', function()
	{
		self.init();
	});

	$scope.$root.$on('user:signin:error', function()
	{
		// console.log('signin error');
		$window.location.href = '/';
	});


	$scope.$root.$on('video:find', function()
	{
		self.switchList('search');
		self.videoSearchList.refreshList();
	});

	$scope.$root.$on('video:find:error', function()
	{

	});



	$scope.$root.$on('player:set:videoid', function()
	{
		self.playerOpenerMenu.open();
	});

	$scope.$root.$on('videohistory:getlist', function()
	{
		self.videoHistoryList.refreshList();
	});

	$scope.$root.$on('videohistory:getlist:error', function()
	{

	});

	$scope.$root.$on('videohistory:add', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:add:error', function()
	{

	});

	$scope.$root.$on('videohistory:delete', function()
	{
		self.videoHistoryList.initList();
	});

	$scope.$root.$on('videohistory:delete:error', function()
	{

	});

	self.init();
});
app.directive('componentFooter', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/components/componentFooter.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('componentHeader', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/components/componentHeader.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('playerControl', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/player/playerControl.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('playerOpenerMenu', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/player/playerOpenerMenu.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('userEntrance', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/user/userEntrance.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('videoList', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/video/videoList.html',
		scope: {
			self: '=set'
		}
	};
});
app.directive('videoSearchBar', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/video/videoSearchBar.html',
		scope: {
			self: '=set'
		}
	};
});
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
					method: method, url: url, params: sendParams,// cache: $templateCache,
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
			// cache: $templateCache,
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
			method: 'POST', url: url, data: params,// cache: $templateCache,
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
app.factory('Player', function($cookies, Api)
{
	'use strict';

	var self = this;

	self.videoId = null;

	// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ja
	self.setting = {
		controls  : null,// 0, 1 (動画内にコントロールを表示させる)
		autoplay  : null,// 0, 1 (ページが読み込まれた時に動画を自動再生する)
		disablekb : null,// 0, 1 (動画がフォーカスされた時にキーボードでの動画操作を不可にする)
		loop      : null,// 0, 1 (動画のループ)
	};

	self.init = function()
	{
		var videoId = $cookies.get('videoId');

		self.videoId = (videoId) ? videoId : null;

		self.setting = {
			controls  : 0,
			autoplay  : 1,
			disablekb : 1,
			loop      : 1,
		};

		Api.emit('player:init');
	};

	self.setVideoId = function(id)
	{
		if (!id) {
			return;
		}

		$cookies.put('videoId', id, {path: '/', expires: moment().add(1, 'day').format('X')});

		self.videoId = id;

		Api.emit('player:set:videoid');
	};

	self.updateSetting = function(key, val)
	{
		if (self.setting[key] === 0 || self.setting[key] === 1) {
			if (val === 0 || val === 1) {
				self.setting[key] = val;
			}
		}
	};

	return {
		init: function()
		{
			self.init();
		},
		setting: function()
		{
			return self.setting;
		},
		videoId: function()
		{
			return self.videoId;
		},
		setVideoId: function(id)
		{
			self.setVideoId(id);
		},
		updateSetting: function(key, val)
		{
			self.updateSetting(key, val);
		}
	};
});
app.factory('PlayerOpener', function($window)
{
	'use strict';

	var self = this;

	self.subwin = null;
	self.userId = null;

	self.open = function(userId)
	{
		if (!self.userId) {
			return;
		}
		// console.log(screen);
		self.subwin = $window.open('/player/' + self.userId + '/youtube', 'komado', 'width=150,height=' + screen.availHeight + ',top=0,left=0,scrollbars=yes,menubar=no,toolbar=no,location=no,directories=no,status=no');
	};

	self.close = function()
	{
		if (!self.subwin || self.subwin.closed) {
			return;
		}
		self.subwin.close();
		$window.alert('thanks :)');
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
		open: function()
		{
			self.open();
		},
		close: function()
		{
			self.close();
		},
		subwin: function()
		{
			return self.subwin;
		}
	};
});
app.factory('User', function($cookies, Api)
{
	'use strict';

	var self = this;

	self.id = null;

	self.validate = {
		id : /^[a-zA-Z0-9]+$/,
	};

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
		if (id.match(self.validate.id)) {
			return true;
		}
		return false;
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
		},
		validate: self.validate,
	};
});
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
app.factory('VideoHistory', function(Api)
{
	'use strict';

	var self = this;

	self.lists  = null;
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
app.factory('componentHeader', function()
{
	'use strict';

	var self = this;

	self.data = {
		userId : null,
	};

	self.init = function(userId)
	{
		self.data.userId = userId;
	};

	return {
		init : self.init,
		data : self.data,
	};
});
app.factory('messenger', function($scope, $timeout, Message)
{
	'use strict';

	var self = this;

	self.hide = true;

	self.init = function()
	{
		self.appear  = false;
		self.success = null;
		self.error   = null;
	};

	self.setSuccess = function(mes)
	{
		self.toaster();
		self.success = mes;
	};

	self.setError = function(mes)
	{
		self.toaster();
		self.error = mes;
	};

	self.toaster = function()
	{
		self.init();
		self.appear = true;
		$timeout(function()
		{
			self.init();
		}, 2000);
	};

	self.removeHide = function()
	{
		$timeout(function()
		{
			self.hide = false;
		}, 3000);
	};

	self.init();
	self.removeHide();

	$scope.$root.$on('message:success', function()
	{
		self.setSuccess(Message.getSuccess());
	});

	$scope.$root.$on('message:error', function()
	{
		self.setError(Message.getError());
	});
});
app.factory('playerControl', function(Player)
{
	'use strict';

	var self = this;

	self.data = {
		videoId : null,
		playing : false,
		setting : {},
		youtube : {},
	};

	self.init = function()
	{
		self.refreshSetting();
		self.refreshVideoId();
	};

	self.refreshSetting = function()
	{
		self.data.setting = Player.setting();
	};

	self.refreshVideoId = function()
	{
		self.data.videoId = Player.videoId();
	};

	self.setPlayingStatus = function(status)
	{
		switch (status) {
			case 'ready':
			case 'playing':
				self.data.playing = true;
				break;
			case 'paused':
			case 'ended':
				self.data.playing = false;
				break;
		}
	};

	self.updateSetting = function(key, val)
	{
		Player.updateSetting(key, val);
	};

	return {
		init             : self.init,
		data             : self.data,
		updateSetting    : self.updateSetting,
		refreshSetting   : self.refreshSetting,
		refreshVideoId   : self.refreshVideoId,
		setPlayingStatus : self.setPlayingStatus,
	};
});
app.factory('playerOpenerMenu', function(PlayerOpener)
{
	'use strict';

	var self = this;

	self.init = function(userId)
	{
		PlayerOpener.init(userId);
	};

	self.open = function()
	{
		PlayerOpener.open();
	};

	self.close = function()
	{
		PlayerOpener.close();
	};

	return {
		init  : self.init,
		open  : self.open,
		close : self.close,
	};
});
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
app.factory('videoHistoryList', function(VideoHistory, Player)
{
	'use strict';

	var self = this;

	self.data = {
		lists : null,
		type  : 'history',
	};

	self.init = function(userId)
	{
		VideoHistory.init(userId);
	};

	self.initList = function()
	{
		VideoHistory.initList();
	};

	self.refreshList = function()
	{
		self.data.lists = VideoHistory.lists();
	};

	self.play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	self.remove = function(id)
	{
		var params = {
			listId : id,
		};
		VideoHistory.delete(params);
	};

	return {
		init        : self.init,
		initList    : self.initList,
		data        : self.data,
		refreshList : self.refreshList,
		play        : self.play,
		remove      : self.remove,
	};
});
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
app.factory('videoSearchList', function(Video, VideoHistory, Player)
{
	'use strict';

	var self = this;

	self.data = {
		lists : null,
		type  : 'search',
	};

	self.init = function(userId)
	{
		VideoHistory.init(userId);
	};

	self.refreshList = function()
	{
		self.data.lists = Video.lists();
	};

	self.play = function(video)
	{
		Player.setVideoId(video.videoId);
		VideoHistory.add(video);
	};

	return {
		init        : self.init,
		data        : self.data,
		refreshList : self.refreshList,
		play        : self.play,
	};
});