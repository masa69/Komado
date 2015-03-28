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

get '/api/youtube/find' do

	keyword = params[:kw]

	# Add each result to the appropriate list, and then display the lists of
	# matching videos, channels, and playlists.
	begin
		opts = Trollop::options do
			opt :q, 'Search term', :type => String, :default => keyword
			opt :maxResults, 'Max results', :type => :int, :default => 25
		end

		client  = Google::APIClient.new(:key => DEVELOPER_KEY,
		                                :authorization => nil)
		youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)
		# Call the search.list method to retrieve results matching the specified
		# query term.
		opts[:part] = 'id,snippet'
		search_response = client.execute!(
			:api_method => youtube.search.list,
			:parameters => opts
		)

		videos    = []
		channels  = []
		playlists = []
		res = []

		# search_response.data.items.each do |search_result|
		# 	case search_result.id.kind
		# 		when 'youtube#video'
		# 			videos.push("#{search_result.snippet.title} (#{search_result.id.videoId})")
		# 		when 'youtube#channel'
		# 			channels.push("#{search_result.snippet.title} (#{search_result.id.channelId})")
		# 		when 'youtube#playlist'
		# 			playlists.push("#{search_result.snippet.title} (#{search_result.id.playlistId})")
		# 	end
		# end

		# # res.push("Videos:\n" + videos + "\n", "Channels:\n" + channels + "\n", "Playlists:\n" + playlists + "\n")
		# videos
		status 200
		json search_response.data.items, :content_type => :js

	rescue Google::APIClient::TransmissionError => e
		e.result.body
	end

end