require 'rubygems'
require 'sinatra'
require "sinatra/json"
require 'dalli'
require 'google/api_client'
require 'trollop'

get '/' do
	erb :index
end

get '/:id' do
	erb :index
end

get '/player' do
	erb :index
end

get '/player/:id' do
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