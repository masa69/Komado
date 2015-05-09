var app = angular.module('komado', ['ngSanitize', 'ngAnimate', 'ngRoute', 'ngCookies', 'angularMoment', 'youtube-embed']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'page',
		})
		.when('/:id', {
			templateUrl: '/templates/views/user.html',
			controller: 'UserController',
			controllerAs: 'page',
		})
		.when('/player/:id/', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		})
		.when('/player/:id/:videoId', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		});
	$locationProvider.html5Mode(true);
}]);