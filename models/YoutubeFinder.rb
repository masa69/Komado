class YoutubeFinder

	@@failed  = nil
	@@client  = nil
	@@youtube = nil

	@@MAX_ITEMS = 30

	def initialize(exceptionClass)

		if !@@failed
			@@failed = exceptionClass
		end

		if !@@client && !@@youtube
			@@client  = Google::APIClient.new(:key => DEVELOPER_KEY, :authorization => nil)
			@@youtube = @@client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)
		end
	end

	def find(keyword)

		opts = Trollop::options do
			opt :q, 'Search term', :type => String, :default => keyword
			opt :maxResults, 'Max results', :type => :int, :default => 25
			opt :type, 'Search type', :type => String, :default => 'video' # 'video, channel, playlist'
		end

		# Call the search.list method to retrieve results matching the specified
		# query term.

		opts[:part] = 'id,snippet'

		search_response = @@client.execute!(
			:api_method => @@youtube.search.list,
			:parameters => opts
		)

		res = []

		search_response.data.items.each do |search_result|
			# case search_result.id.kind
			# 	when 'youtube#video'
			# 		res.push(pushToLists(
			# 			search_result.id.videoId, 'yt_video',
			# 			search_result.snippet.thumbnails.medium.url,
			# 			search_result.snippet.title))
			# 	when 'youtube#playlist'
			# 		res.push(pushToLists(
			# 			search_result.id.playlistId, 'yt_playlist',
			# 			search_result.snippet.thumbnails.medium.url,
			# 			search_result.snippet.title))
			# end
			res.push(pushToLists(
				search_result.id.videoId,'yt_video',
				search_result.snippet.thumbnails.medium.url,
				search_result.snippet.title))
		end

		res

		# Sample youtube items list
		# [video]
		# {
		# 	"kind":"youtube#searchResult",
		# 	"etag":"\"dhbhlDw5j8dK10GxeV_UG6RSReM/YOrSBTNKMP1TNuE4mls5rrI2jqY\"",
		# 	"id":
		# 	{
		# 		"kind":"youtube#video",
		# 		"videoId":"aPQb6XkxNL4"
		# 	},
		# 	"snippet":
		# 	{
		# 		"publishedAt":"2015-02-04T18:45:24.000Z",
		# 		"channelId":"UCrEKPrJOkTbaOxeZJ8q6Dew",
		# 		"title":"The Dodos - Competition [OFFICIAL MUSIC VIDEO]",
		# 		"description":"\"Competition\" appears on The Dodos' sixth full-length album, Individ, out now. Purchase the album on CD, LP, Tape, MP3 here ...",
		# 		"thumbnails":
		# 		{
		# 			"default":{"url":"https://i.ytimg.com/vi/aPQb6XkxNL4/default.jpg"},
		# 			"medium":{"url":"https://i.ytimg.com/vi/aPQb6XkxNL4/mqdefault.jpg"},
		# 			"high":{"url":"https://i.ytimg.com/vi/aPQb6XkxNL4/hqdefault.jpg"}
		# 		},
		# 		"channelTitle":"PolyvinylRecords","liveBroadcastContent":"none"
		# 	}
		# },
		#
		# [playlist]
		# {
		# 	"kind":"youtube#searchResult",
		# 	"etag":"\"dhbhlDw5j8dK10GxeV_UG6RSReM/Thqz8odgZ6nPeWAEcloMEm-rhWQ\"",
		# 	"id":
		# 	{
		# 		"kind":"youtube#playlist",
		# 		"playlistId":"PLA28D513E7F307CA2"
		# 	},
		# 	"snippet":
		# 	{
		# 		"publishedAt":"2010-12-28T07:59:49.000Z",
		# 		"channelId":"UCZan9vOTAbLiTnryo-JQw-g",
		# 		"title":"The Dodos / BEWARE OF THE MANIACS",
		# 		"description":"2006 Dodo Bird Records/Revolver.",
		# 		"thumbnails":
		# 		{
		# 			"default":{"url":"https://i.ytimg.com/vi/fobpyHWg8p8/default.jpg"},
		# 			"medium":{"url":"https://i.ytimg.com/vi/fobpyHWg8p8/mqdefault.jpg"},
		# 			"high":{"url":"https://i.ytimg.com/vi/fobpyHWg8p8/hqdefault.jpg"}
		# 		},
		# 		"channelTitle":"sbritt","liveBroadcastContent":"none"
		# 	}
		# },
	end

	def pushToLists(videoId, type, thumbnail, title)
		res = {
			'videoId' => videoId,
			'type' => type,
			'thumbnail' => thumbnail,
			'title' => title,
		}
		res
	end
end