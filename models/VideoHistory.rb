class VideoHistory

	@@e = nil
	@@MAX_ITEMS = 30

	def initialize(exceptionClass)
		if !@@e
			@@e = exceptionClass
		end
	end

	def getList(user)

		if !user
			@@e.exception('user is required', 404)
		end

		dc     = Dalli::Client.new('localhost:11211')
		videos = dc.get('history_' + user)

		videos.each_index do |i|
			id = i + 1
			videos[i]['id'] = id.to_s
		end

		videos
	end

	def add(user, videoId, type, thumbnail, title)

		videoId   = '1'
		type      = 'type'
		thumbnail = 'thumbnail'
		title     = 'title'

		if !user
			@@e.exception('user is required', 404)
		end
		if !videoId
			@@e.exception('video_id is required', 404)
		end
		if !type
			@@e.exception('type is required', 404)
		end
		if !thumbnail
			@@e.exception('thumbnail is required', 404)
		end
		if !title
			@@e.exception('title is required', 404)
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

		if videos.length > @@MAX_ITEMS
			videos.slice!(@@MAX_ITEMS - 1, videos.length - @@MAX_ITEMS)
		end

		dc.set('history_' + user, videos)
	end

	def delete(user, id)

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
	end
end