require 'rubygems'
require 'sinatra'
require "sinatra/json"
require 'dalli'
require 'google/api_client'
require 'trollop'

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

def pushToLists(id, type, thumbnail, title)
	res = {
		'id' => id,
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
			case search_result.id.kind
				when 'youtube#video'
					res.push(pushToLists(
						search_result.id.videoId, 'yt_video',
						search_result.snippet.thumbnails.medium.url,
						search_result.snippet.title))
				when 'youtube#playlist'
					res.push(pushToLists(
						search_result.id.playlistId, 'yt_playlist',
						search_result.snippet.thumbnails.medium.url,
						search_result.snippet.title))
			end
		end

		status 200
		json res, :content_type => :js
	rescue Google::APIClient::TransmissionError => e
		status 500
		e.result.body
	end
end

get '/api/youtube/history/get/:user' do

	res  = ReturnToFront.new

	user = params['user']

	begin
		if !user
			res.exception('user is required', 404)
		end
		dc     = Dalli::Client.new('localhost:11211')
		videos = dc.get('history_' + user)

		videos.each_index do |i|
			id = i + 1
			videos[i]['id'] = id.to_s
		end
		status res.getCode()
		json res.success(videos), :content_type => :js
	rescue Exception => e
		status res.getCode()
		json res.failed(e), :content_type => :js
	end
end

get '/api/youtube/history/add/:user' do

	res  = ReturnToFront.new

	MAX_ITEMS = 30

	user      = params['user']
	videoId   = params[:video_id]
	type      = params[:type]
	thumbnail = params[:thumbnail]
	title     = params[:title]

	videoId   = '1'
	type      = 'type'
	thumbnail = 'thumbnail'
	title     = 'title'

	begin
		if !user
			res.exception('user is required', 404)
		end
		if !videoId
			res.exception('video_id is required', 404)
		end
		if !type
			res.exception('type is required', 404)
		end
		if !thumbnail
			res.exception('thumbnail is required', 404)
		end
		if !title
			res.exception('title is required', 404)
		end

		videoData = {
			'videoId'   => videoId,
			'type'      => type,
			'thumbnail' => thumbnail,
			'title'     => title,
		}

		options = {:expires_in => 60*60*24*7}
		dc = Dalli::Client.new('localhost:11211', options)
		videos = dc.get('history_' + user)

		if videos.kind_of? (Array)
			videos.reverse!
			sub    = Array[videoData]
			videos = videos - sub
			videos << videoData
			videos.reverse!
		else
			videos = Array[videoData]
		end

		if videos.length > MAX_ITEMS
			videos.slice!(MAX_ITEMS - 1, videos.length - MAX_ITEMS)
		end

		dc.set('history_' + user, videos)

		status res.getCode()
		json res.success(videos), :content_type => :js
	rescue Exception => e
		status res.getCode()
		json res.failed(e), :content_type => :js
	end
end

get '/api/youtube/history/delete/:user' do

	res  = ReturnToFront.new

	user = params['user']
	id   = params[:list_id]

	begin
		if !user
			res.exception('user is required', 404)
		end
		if !id
			res.exception('list_id is required', 404)
		end

		dc = Dalli::Client.new('localhost:11211')
		videos = dc.get('history_' + user)

		if videos.kind_of? (Array)
			videos.slice!(id)
		end

		dc.set('history_' + user, videos)

		status res.getCode()
		json res.success(videos), :content_type => :js
	rescue Exception => e
		status res.getCode()
		json res.failed(e), :content_type => :js
	end
end