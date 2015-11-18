app.directive('videoSearchBar', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/video/videoSearchBar.html',
		scope: {
			self: '=set'
		}
	};
});