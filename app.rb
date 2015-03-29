require 'rubygems'
require 'sinatra'
require 'dalli'

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

get '/api/youtube/find' do
	res = 'test'
	kw  = params[:kw]
	res = kw
end