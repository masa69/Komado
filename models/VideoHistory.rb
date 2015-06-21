class VideoHistory

	@@failed     = nil
	@@collection = nil

	@@MAX_ITEMS = 30

	def initialize(exceptionClass)

		if !@@failed
			@@failed = exceptionClass
		end

		if !@@collection
			connection = Mongo::Connection.new('localhost', 27017)
			db = connection.db('komado')
			@@collection = db.collection('video_history')
		end
	end

	def get(user)
		# @@collection.find(:user => user).sort(['addedTime', -1])
		@@collection.find(:user => user).sort('addedTime')
	end

	def getIdByVideoId(user, videoId)
		@@collection.find(:user => user, :videoId => videoId)
	end

	def getList(user)

		res = []

		if !user
			@@failed.exception('user is required', 404)
		end

		videos = get(user)

		if videos.count > 0
			videos.each do |video|
				res.push(video)
			end
		end

		res.reverse
	end

	def add(user, videoId, type, thumbnail, title)

		# videoId   = '1'
		# type      = 'type'
		# thumbnail = 'thumbnail'
		# title     = 'title'

		if !user
			@@failed.exception('user is required', 404)
		end
		if !videoId
			@@failed.exception('videoId is required', 404)
		end
		if !type
			@@failed.exception('type is required', 404)
		end
		if !thumbnail
			@@failed.exception('thumbnail is required', 404)
		end
		if !title
			@@failed.exception('title is required', 404)
		end

		videoData = {
			'user'      => user,
			'videoId'   => videoId,
			'type'      => type,
			'thumbnail' => thumbnail,
			'title'     => title,
			'addedTime' => Time.now.to_i.to_s
		}

		videoIds = getIdByVideoId(user, videoId)

		if videoIds.count > 0
			videoIds.each do |video|
				delete(user, video['_id'].to_s)
			end
		end

		videos  = get(user)
		itemCnt = videos.count

		if itemCnt >= @@MAX_ITEMS
			videos.each do |video|
				if itemCnt >= @@MAX_ITEMS
					delete(user, video['_id'].to_s)
				else
					break
				end
				itemCnt -= 1
			end
		end

		@@collection.insert(videoData)

		return true
	end

	def delete(user, listId)

		if !user
			@@failed.exception('user is required', 404)
		end

		if !listId
			@@failed.exception('listId is required', 404)
		end

		id = BSON::ObjectId(listId)

		@@collection.find('_id' => id).each do |video|
			if video['user'] == user
				@@collection.remove(video)
			end
		end

		return true
	end
end