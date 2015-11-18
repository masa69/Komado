var app = angular.module('komado', ['ngSanitize', 'ngAnimate', 'ngRoute', 'ngCookies', 'ngMessages', 'angularMoment', 'youtube-embed']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
	$routeProvider
		.when('/', {
			templateUrl: '/templates/views/index.html',
			controller: 'IndexController',
			controllerAs: 'page',
		})
		.when('/player/:userId/:videoType', {
			templateUrl: '/templates/views/player.html',
			controller: 'PlayerController',
			controllerAs: 'page',
		})
		.when('/:userId', {
			templateUrl: '/templates/views/user.html',
			controller: 'UserController',
			controllerAs: 'page',
		});
	// $locationProvider.html5Mode(true);
	$locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: false });
}]);