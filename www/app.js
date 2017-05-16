var app = angular.module("brpApp", [
  'ngRoute',
  'ngResource',
  'ngTouch',
  'ui.bootstrap'
]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

	$routeProvider
	.when("/",{
		templateUrl: "views/home.html",
		controller: "homeCtrl"
	})
	.when("/photos",{
		templateUrl: "views/photos.html",
		controller: "photosCtrl"
	})
	.when("/videos",{
		templateUrl: "views/videos.html",
		controller: "videosCtrl"
	})
	.when("/forum",{
		templateUrl: "views/forum.html",
		controller: "forumCtrl"
	})
	.when("/members",{
		templateUrl: "views/members.html",
		controller: "membersCtrl"
	})
	.when("/registration",{
		templateUrl: "views/registration.html",
		controller: "regCtrl"
	})
	.when("/login",{
		templateUrl: "views/login.html",
		controller: "loginCtrl"
	})
	.when("/admin",{
		templateUrl: "views/admin.html",
		controller: "adminCtrl"
	})
	.otherwise({
		templateUrl: "views/home.html"
	});

	$locationProvider.html5Mode(true);
}]);



