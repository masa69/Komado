app.directive('playerControl', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/player/playerControl.html',
		scope: {
			self: '=set'
		}
	};
});