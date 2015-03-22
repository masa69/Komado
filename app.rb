require 'rubygems'
require 'sinatra'

get '/' do
	test = 'test'
	erb :index, :locals => {
		:test => test
	}
end

get '/:id' do
	test = 'test'
	id   = params[:id]
	erb :test, :locals => {
		:test => test,
		:id   => id
	}
end