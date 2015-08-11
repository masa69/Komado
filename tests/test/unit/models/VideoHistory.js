describe('[Model] VideoHistory', function()
{
	'use strict';

	beforeEach(module('komado'));

	var VideoHistory;
	var $cookies, Api;
	var $httpBackend, $rootScope;

	beforeEach(inject(
		function($injector)
		{
			VideoHistory = $injector.get('VideoHistory');

			Api = $injector.get('Api');

			$httpBackend = $injector.get('$httpBackend');
			$rootScope   = $injector.get('$rootScope');
		}
	));

	afterEach(inject(
		function()
		{
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		}
	));

	it('init() -> initList() -> lists() error', inject(
		function()
		{
			var userId = null;

			var emittedVideoHistoryGetList      = false;
			var emittedVideoHistoryGetListError = false;

			$rootScope.$on('videohistory:getlist', function()
			{
				emittedVideoHistoryGetList = true;
			});

			$rootScope.$on('videohistory:getlist:error', function()
			{
				emittedVideoHistoryGetListError = true;
			});

			VideoHistory.init(userId);
			VideoHistory.initList();

			expect(VideoHistory.lists()).toEqual(null);

			expect(emittedVideoHistoryGetList).toEqual(false);
			expect(emittedVideoHistoryGetListError).toEqual(true);
		}
	));

	it('init() -> initList() -> lists() success', inject(
		function()
		{
			var userId = 'test';

			var emittedVideoHistoryGetList      = false;
			var emittedVideoHistoryGetListError = false;

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
						{
							"_id":{"$oid": "55a50c7ee967a81e10000007"},
							"user":userId,
							"videoId":"7SakvUV3kLc",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/7SakvUV3kLc/mqdefault.jpg",
							"title":"Of Monsters and Men \"Crystals\" - C à vous - 03/06/2015",
							"addedTime":"1436879998"
						},
						{
							"_id":{"$oid": "55a50c78e967a81e10000006"},
							"user":userId,
							"videoId":"LPimohuBWKs",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/LPimohuBWKs/mqdefault.jpg",
							"title":"The Dodos - Full Performance (Live on KEXP)",
							"addedTime":"1436879992"
						},
						{
							"_id":{"$oid": "55a50c76e967a81e10000005"},
							"user":userId,
							"videoId":"GnnfXPJxnCo",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/GnnfXPJxnCo/mqdefault.jpg",
							"title":"Noel Gallagher 's High Flying Birds - Live in London 2015 - Full Gig",
							"addedTime":"1436879990"
						},
						{
							"_id":{"$oid": "55a50c67e967a81e10000004"},
							"user":userId,
							"videoId":"ysGrtOj2DLQ",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/ysGrtOj2DLQ/mqdefault.jpg",
							"title":"The Prodigy Live @ HMH Amsterdam, April 10th 2015 (7 songs)",
							"addedTime":"1436879975"
						}
					]
				});

			$rootScope.$on('videohistory:getlist', function()
			{
				emittedVideoHistoryGetList = true;
			});

			$rootScope.$on('videohistory:getlist:error', function()
			{
				emittedVideoHistoryGetListError = true;
			});

			VideoHistory.init(userId);
			VideoHistory.initList();

			$httpBackend.flush();

			// VideoHistory.lists()
			expect(VideoHistory.lists()).toEqual(
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
				{
					"_id":{"$oid": "55a50c7ee967a81e10000007"},
					"user":userId,
					"videoId":"7SakvUV3kLc",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/7SakvUV3kLc/mqdefault.jpg",
					"title":"Of Monsters and Men \"Crystals\" - C à vous - 03/06/2015",
					"addedTime":"1436879998"
				},
				{
					"_id":{"$oid": "55a50c78e967a81e10000006"},
					"user":userId,
					"videoId":"LPimohuBWKs",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/LPimohuBWKs/mqdefault.jpg",
					"title":"The Dodos - Full Performance (Live on KEXP)",
					"addedTime":"1436879992"
				},
				{
					"_id":{"$oid": "55a50c76e967a81e10000005"},
					"user":userId,
					"videoId":"GnnfXPJxnCo",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/GnnfXPJxnCo/mqdefault.jpg",
					"title":"Noel Gallagher 's High Flying Birds - Live in London 2015 - Full Gig",
					"addedTime":"1436879990"
				},
				{
					"_id":{"$oid": "55a50c67e967a81e10000004"},
					"user":userId,
					"videoId":"ysGrtOj2DLQ",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/ysGrtOj2DLQ/mqdefault.jpg",
					"title":"The Prodigy Live @ HMH Amsterdam, April 10th 2015 (7 songs)",
					"addedTime":"1436879975"
				}
			]);
			expect(emittedVideoHistoryGetList).toEqual(true);
			expect(emittedVideoHistoryGetListError).toEqual(false);
		}
	));

	it('init() -> add(params) error', inject(
		function()
		{
			var userId = null;

			var params = {
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

			VideoHistory.init(userId);
			VideoHistory.add(params);

			// $httpBackend.flush();

			expect(VideoHistory.lists()).toEqual(null);

			expect(emittedVideoHistoryAdd).toEqual(false);
			expect(emittedVideoHistoryAddError).toEqual(true);
		}
	));

	it('init() -> add(params) success', inject(
		function()
		{
			var userId = 'test';

			var sendParams = {
				videoId   : 'd8Ya7B8wKB8',
				type      : 'yt_video',
				thumbnail : 'https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg',
				title     : 'The Dodos - Visiter (Full Album)',
			};

			var emittedVideoHistoryAdd      = false;
			var emittedVideoHistoryAddError = false;

			var params = new FormData();
			angular.forEach(sendParams, function(val, key)
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

			VideoHistory.init(userId);
			VideoHistory.add(params);

			$httpBackend.flush();

			expect(emittedVideoHistoryAdd).toEqual(true);
			expect(emittedVideoHistoryAddError).toEqual(false);
		}
	));
});