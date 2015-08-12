describe('[Module] videoSearchBar', function()
{
	'use strict';

	beforeEach(module('komado'));

	var videoSearchBar;
	var Video;
	var $httpBackend;

	beforeEach(inject(
		function($injector)
		{
			videoSearchBar = $injector.get('videoSearchBar');

			Video = $injector.get('Video');

			$httpBackend = $injector.get('$httpBackend');
		}
	));

	afterEach(inject(
		function()
		{
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		}
	));

	it('init()', inject(
		function()
		{
			videoSearchBar.init();
			// do nothing
		}
	));

	it('find()', inject(
		function()
		{
			videoSearchBar.sendParams.find.kw = 'dodos';

			$httpBackend
				// .expectGET('/api/youtube/find', params)
				.expectGET('/api/youtube/find?kw=' + videoSearchBar.sendParams.find.kw)
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

			videoSearchBar.find();
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
			]);
		}
	));
});