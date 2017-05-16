app.controller("showCtrl", ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {
	$rootScope.$watch(function (){
		$scope.currentPath = $location.path();
	})
}]);