class ReturnToFront

	@@code = nil

	def success(data)
		@@code = nil
		data = (data === true) ? nil : data;
		data = (data) ? data : '';
		res = {
			'result'  => 'success',
			'message' => '',
			'data'    => data,
		}
		res
	end

	def failed(mes)
		@@code = nil
		res = {
			'result'  => 'failed',
			'message' => mes,
			'data'    => '',
		}
		res
	end

	def exception(mes, code)
		@@code = code
		raise mes
	end

	def errorCode()
		(@@code) ? @@code : 500
	end
end