app.directive('playerOpenerMenu', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/player/playerOpenerMenu.html',
		scope: {
			self: '=set'
		}
	};
});