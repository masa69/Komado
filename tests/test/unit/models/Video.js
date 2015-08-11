describe('[Model] Video', function()
{
	'use strict';

	beforeEach(module('komado'));

	var Video;
	var $httpBackend, $rootScope;

	beforeEach(inject(
		function($injector)
		{
			Video = $injector.get('Video');

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

	it('find()', inject(
		function()
		{
			var params = {
				kw : 'dodos',
			};

			var emittedVideoFind      = false;
			var emittedVideoFindError = false;

			$httpBackend
				// .expectGET('/api/youtube/find', params)
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
						{
							"videoId":"aPQb6XkxNL4",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/aPQb6XkxNL4/mqdefault.jpg",
							"title":"The Dodos - Competition [OFFICIAL MUSIC VIDEO]"
						},
						{
							"videoId":"V3O8O2p-tLw",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/V3O8O2p-tLw/mqdefault.jpg",
							"title":"The Dodos - Beware Of The Maniacs Full Album"
						},
						{
							"videoId":"nyxUS_KnhfE",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/nyxUS_KnhfE/mqdefault.jpg",
							"title":"The Dodos - Confidence [OFFICIAL MUSIC VIDEO]"
						},
						{
							"videoId":"1d6IeNpC9p0",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/1d6IeNpC9p0/mqdefault.jpg",
							"title":"The Dodos - Black Night"
						},
						{
							"videoId":"LPimohuBWKs",
							"type":"yt_video",
							"thumbnail":"https://i.ytimg.com/vi/LPimohuBWKs/mqdefault.jpg",
							"title":"The Dodos - Full Performance (Live on KEXP)"
						}
					]
				});

			$rootScope.$on('video:find', function()
			{
				emittedVideoFind = true;
			});

			$rootScope.$on('video:find:error', function()
			{
				emittedVideoFindError = true;
			});

			Video.find(params);
			$httpBackend.flush();

			// Video.lists()
			expect(Video.lists()).toEqual(
			[
				{
					"videoId":"d8Ya7B8wKB8",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/d8Ya7B8wKB8/mqdefault.jpg",
					"title":"The Dodos - Visiter (Full Album)"
				},
				{
					"videoId":"aPQb6XkxNL4",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/aPQb6XkxNL4/mqdefault.jpg",
					"title":"The Dodos - Competition [OFFICIAL MUSIC VIDEO]"
				},
				{
					"videoId":"V3O8O2p-tLw",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/V3O8O2p-tLw/mqdefault.jpg",
					"title":"The Dodos - Beware Of The Maniacs Full Album"
				},
				{
					"videoId":"nyxUS_KnhfE",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/nyxUS_KnhfE/mqdefault.jpg",
					"title":"The Dodos - Confidence [OFFICIAL MUSIC VIDEO]"
				},
				{
					"videoId":"1d6IeNpC9p0",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/1d6IeNpC9p0/mqdefault.jpg",
					"title":"The Dodos - Black Night"
				},
				{
					"videoId":"LPimohuBWKs",
					"type":"yt_video",
					"thumbnail":"https://i.ytimg.com/vi/LPimohuBWKs/mqdefault.jpg",
					"title":"The Dodos - Full Performance (Live on KEXP)"
				}
			]);
			expect(emittedVideoFind).toEqual(true);
			expect(emittedVideoFindError).toEqual(false);
		}
	));
});