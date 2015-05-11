app.directive('videoList', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/video/videoList.html',
		scope: {
			self: '=set'
		}
	};
});