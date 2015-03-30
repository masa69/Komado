app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'index',
		})
		.when('/:id', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'index',
		})
		.when('/player/:id/', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'player',
		})
		.when('/player/:id/:videoId', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'player',
		});
	$locationProvider.html5Mode(true);
}]);

app.controller('RouteController', function()
{
	'use strict';
	var self = this;
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