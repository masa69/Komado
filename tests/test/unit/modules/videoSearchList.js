describe('[Module] videoSearchList', function()
{
	'use strict';

	beforeEach(module('komado'));

	var videoSearchList;
	var Video, VideoHistory, Player;
	var $httpBackend, $rootScope;

	beforeEach(inject(
		function($injector)
		{
			videoSearchList = $injector.get('videoSearchList');

			Video        = $injector.get('Video');
			VideoHistory = $injector.get('VideoHistory');
			Player       = $injector.get('Player');

			$httpBackend = $injector.get('$httpBackend');
			$rootScope   = $injector.get('$rootScope');
		}
	));

	afterEach(inject(
		function()
		{

		}
	));

	/**
	 * User.id()から正しい値が返る状態で
	 * videoSearchList が呼び出される。
	 */

	it('data.type must be search', inject(
		function()
		{
			expect(videoSearchList.data.type).toEqual('search');
		}
	));

	it('refreshList()', inject(
		function()
		{
			var params = {
				kw : 'dodos',
			};

			$httpBackend
				.expectGET('/api/youtube/find?kw=' + params.kw)
				.respond(200, {
					"result":"success",
					"message":"",
					"data":
					[
						{
							"videoId":"d8Ya7B8wKB8",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg",
							"title":"The Dodos - Visiter (Full Album)"
						},
					]
				});

			Video.find(params);
			$httpBackend.flush();

			expect(videoSearchList.data.lists).toEqual(null);

			videoSearchList.refreshList();
			expect(videoSearchList.data.lists).toEqual(
			[
				{
					"videoId":"d8Ya7B8wKB8",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg",
					"title":"The Dodos - Visiter (Full Album)"
				},
			]);
		}
	));

	it('no init() -> play() error', inject(
		function()
		{
			var video  = {
				videoId   : 'd8Ya7B8wKB8',
				type      : 'yt_video',
				thumbnail : 'https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg',
				title     : 'The Dodos - Visiter (Full Album)',
			};

			var emittedVideoHistoryAdd      = false;
			var emittedVideoHistoryAddError = false;

			$rootScope.$on('videohistory:add', function()
			{
				emittedVideoHistoryAdd = true;
			});

			$rootScope.$on('videohistory:add:error', function()
			{
				emittedVideoHistoryAddError = true;
			});

			videoSearchList.play(video);

			expect(Player.videoId()).toEqual('d8Ya7B8wKB8');
			expect(emittedVideoHistoryAdd).toEqual(false);
			expect(emittedVideoHistoryAddError).toEqual(true);
		}
	));

	it('init() -> play() success', inject(
		function()
		{
			var userId = 'masa69';
			var video  = {
				videoId   : 'd8Ya7B8wKB8',
				type      : 'yt_video',
				thumbnail : 'https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg',
				title     : 'The Dodos - Visiter (Full Album)',
			};

			var emittedVideoHistoryAdd      = false;
			var emittedVideoHistoryAddError = false;

			var params = new FormData();
			angular.forEach(video, function(val, key)
			{
				if (val) {
					params.append(key, val);
				}
			});

			$httpBackend
				.expectPOST('/api/youtube/history/add/' + userId, params)
				.respond(200, {
					"result":"success",
					"message":"",
					"data":""
				});

			$rootScope.$on('videohistory:add', function()
			{
				emittedVideoHistoryAdd = true;
			});

			$rootScope.$on('videohistory:add:error', function()
			{
				emittedVideoHistoryAddError = true;
			});

			videoSearchList.init(userId);
			videoSearchList.play(video);

			$httpBackend.flush();

			expect(Player.videoId()).toEqual('d8Ya7B8wKB8');
			expect(emittedVideoHistoryAdd).toEqual(true);
			expect(emittedVideoHistoryAddError).toEqual(false);
		}
	));
});