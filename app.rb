require 'rubygems'
require 'sinatra'
require "sinatra/json"
require 'dalli'
require 'google/api_client'
require 'trollop'
require 'mongo'

require './models/VideoHistory'
require './models/ReturnToFront'

get '/' do
	erb :index
end

get '/:id' do
	erb :index
end

get '/:controller/:action' do
	erb :index
end

# API
# ================

error do |e|
  status 500
  body env['sinatra.error'].message
  # body e.message
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

def initYoutubeApi
	client  = Google::APIClient.new(:key => DEVELOPER_KEY, :authorization => nil)
	youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)
	return client, youtube
end

get '/api/youtube/find' do

	keyword = params[:kw]

	# Add each result to the appropriate list, and then display the lists of
	# matching videos, channels, and playlists.
	begin
		opts = Trollop::options do
			opt :q, 'Search term', :type => String, :default => keyword
			opt :maxResults, 'Max results', :type => :int, :default => 25
			opt :type, 'Search type', :type => String, :default => 'video' # 'video, channel, playlist'
		end

		client, youtube = initYoutubeApi

		# Call the search.list method to retrieve results matching the specified
		# query term.

		opts[:part] = 'id,snippet'

		search_response = client.execute!(
			:api_method => youtube.search.list,
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
				search_result.id.videoId, 'yt_video',
				search_result.snippet.thumbnails.medium.url,
				search_result.snippet.title))
		end

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

		status 200
		json res, :content_type => :js
	rescue Google::APIClient::TransmissionError => e
		status 500
		e.result.body
	end
end

def initVideoHistory
	returnToFront = ReturnToFront.new
	videoHistory  = VideoHistory.new(returnToFront)
	return returnToFront, videoHistory
end

get '/api/youtube/history/get/:user' do

	res, videoHistory = initVideoHistory

	user = params['user']

	begin
		videos = videoHistory.getList(user)
		status 200
		json res.success(videos), :content_type => :js
	rescue Exception => e
		status res.errorCode()
		json res.failed(e), :content_type => :js
	end
end

post '/api/youtube/history/add/:user' do

	res, videoHistory = initVideoHistory

	user      = params['user']
	videoId   = params[:videoId]
	type      = params[:type]
	thumbnail = params[:thumbnail]
	title     = params[:title]

	begin
		videoRes = videoHistory.add(user, videoId, type, thumbnail, title)
		status 200
		json res.success(videoRes), :content_type => :js
	rescue Exception => e
		status res.errorCode()
		json res.failed(e), :content_type => :js
	end
end

post '/api/youtube/history/delete/:user' do

	res, videoHistory = initVideoHistory

	user   = params['user']
	listId = params[:listId]

	begin
		videoRes = videoHistory.delete(user, listId)
		status 200
		json res.success(videoRes), :content_type => :js
	rescue Exception => e
		status res.errorCode()
		json res.failed(e), :content_type => :js
	end
end