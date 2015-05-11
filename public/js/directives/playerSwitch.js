app.directive('playerSwitch', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/player/playerSwitch.html',
		scope: {
			self: '=set'
		}
	};
});