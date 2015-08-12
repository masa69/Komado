describe('[Module] videoHistoryList', function()
{
	'use strict';

	beforeEach(module('komado'));

	var videoHistoryList;
	var VideoHistory, Player;
	var $httpBackend, $rootScope;

	beforeEach(inject(
		function($injector)
		{
			videoHistoryList = $injector.get('videoHistoryList');

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
	 * videoHistoryList が呼び出される。
	 */

	it('data.type must be history', inject(
		function()
		{
			expect(videoHistoryList.data.type).toEqual('history');
		}
	));

	it('no init() -> refreshList() error', inject(
		function()
		{
			videoHistoryList.initList();

			expect(videoHistoryList.data.lists).toEqual(null);

			videoHistoryList.refreshList();
			expect(videoHistoryList.data.lists).toEqual(null);
		}
	));

	it('init() -> refreshList() success', inject(
		function()
		{
			var userId = 'masa69';

			$httpBackend
				.expectGET('/api/youtube/history/get/' + userId)
				.respond(200, {
					"result":"success",
					"message":"",
					"data":
					[
						{
							"_id":{"$oid": "55a50c85e967a81e10000008"},
							"user":userId,
							"videoId":"qt-ohn5C3kU",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/qt-ohn5C3kU/mqdefault.jpg",
							"title":"Thom Yorke 30 min Boiler Room DJ set",
							"addedTime":"1436880005"
						},
					]
				});

			videoHistoryList.init(userId);
			videoHistoryList.initList();
			$httpBackend.flush();

			expect(videoHistoryList.data.lists).toEqual(null);

			videoHistoryList.refreshList();
			expect(videoHistoryList.data.lists).toEqual(
			[
				{
					"_id":{"$oid": "55a50c85e967a81e10000008"},
					"user":userId,
					"videoId":"qt-ohn5C3kU",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/qt-ohn5C3kU/mqdefault.jpg",
					"title":"Thom Yorke 30 min Boiler Room DJ set",
					"addedTime":"1436880005"
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

			videoHistoryList.play(video);

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

			videoHistoryList.init(userId);
			videoHistoryList.play(video);

			$httpBackend.flush();

			expect(Player.videoId()).toEqual('d8Ya7B8wKB8');
			expect(emittedVideoHistoryAdd).toEqual(true);
			expect(emittedVideoHistoryAddError).toEqual(false);
		}
	));
});