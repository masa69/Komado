app.directive('userEntrance', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/user/userEntrance.html',
		scope: {
			self: '=set'
		}
	};
});