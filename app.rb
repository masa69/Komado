require 'rubygems'
require 'sinatra'
require "sinatra/json"
require 'dalli'
require 'google/api_client'
require 'trollop'
require 'mongo'


require './models/YoutubeFinder'
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

get '/:controller/:action/:param' do
	erb :index
end

# API
# ================

error do |e|
  status 500
  body env['sinatra.error'].message
  # body e.message
end

def initYoutube
	returnToFront = ReturnToFront.new
	youtube       = YoutubeFinder.new(returnToFront)
	return returnToFront, youtube
end

get '/api/youtube/find' do

	res, youtube = initYoutube

	keyword = params[:kw]

	begin
		videos = youtube.find(keyword)
		status 200
		json res.success(videos), :content_type => :js
	rescue Exception => e
		status res.errorCode()
		json res.failed(e), :content_type => :js
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