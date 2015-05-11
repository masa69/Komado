app.directive('componentHeader', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/components/componentHeader.html',
		scope: {
			self: '=set'
		}
	};
});