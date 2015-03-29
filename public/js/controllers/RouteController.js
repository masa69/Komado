app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/:id', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'index',
		})
		.when('/player/:id', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'player',
		});
	$locationProvider.html5Mode(true);
}]);

app.controller('RouteController', function($routeParams)
{
	'use strict';

	var self = this;

	console.log($routeParams);
})
	.directive('componentHeader', function()
	{
		return {
			restrict: 'E',
			templateUrl: '/templates/components/componentHeader.html',
		};
	})
	.directive('componentFooter', function()
	{
		return {
			restrict: 'E',
			templateUrl: '/templates/components/componentFooter.html',
		};
	});