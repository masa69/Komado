require './app'

configure do
	# enable :reloader
	# enable :logging
	# file = File.new("#{settings.root}/log/#{settings.environment}.log", 'a+')
	# file.sync = true
	# use Rack::CommonLogger, file
end

# Set DEVELOPER_KEY to the "API key" value from the "Access" tab of the
# Google Developers Console <https://cloud.google.com/console>
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY            = 'API key from Google Developers Console'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION      = 'v3'

run Sinatra::Application