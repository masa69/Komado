app.directive('componentFooter', function()
{
	return {
		restrict: 'E',
		templateUrl: '/templates/components/componentFooter.html',
		scope: {
			self: '=set'
		}
	};
});