var app = angular.module('komado', ['ngSanitize', 'ngAnimate', 'ngRoute', 'ngCookies', 'angularMoment', 'youtube-embed']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'page',
		})
		.when('/:userId', {
			templateUrl: '/templates/views/user.html',
			controller: 'UserController',
			controllerAs: 'page',
		})
		.when('/player/:userId/', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		})
		.when('/player/:userId/:videoId', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		});
	// $locationProvider.html5Mode(true);
	$locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: false });
}]);