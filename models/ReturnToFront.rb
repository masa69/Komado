class ReturnToFront

	@@code = 500

	def success(data)
		@@code = 200
		res = {
			'result'  => 'success',
			'message' => '',
			'data'    => data,
		}
		res
	end

	def failed(mes)
		res = {
			'result'  => 'failed',
			'message' => mes,
			'data'    => '',
		}
		res
	end

	def exception(mes, code)
		code = code
		raise mes
	end

	def getCode()
		@@code
	end
end