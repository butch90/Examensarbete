app.controller("videosCtrl", ["$scope", "$sce", "$location", "$http","$route", function($scope, $sce, $location, $http, $route) {
	
	$scope.$on('$viewContentLoaded', function(){
    getMovieUrls();
    $scope.checkForLoggedIn();
  });

	$scope.trustSrc = function(src){
		return $sce.trustAsResourceUrl(src);
	}

	$scope.reloadRoute = function(){
   $route.reload();
	}

	$scope.addMovie = function(){
		$scope.userVideo = $scope.userVideo.replace("watch?v=", "embed/");
		$http({
			method: 'post',
			url: '/fs/addvideourl',
			data: {fileName: $scope.userVideo}
		}).then(function successCallback(res){
			$scope.reloadRoute();
		}, function errorCallback(res){
			console.log("err");
		})
	}

	function getMovieUrls (){
		$http({
			method: 'get',
			url: '/fs/getvideourls'
		}).then(function successCallback(res){
			$scope.moviesUrls = res.data;
		}, function errorCallback(res){
			console.log("err");
		})
	}
	$scope.checkForLoggedIn = function(){
		$http({
			method: 'GET',
			url: '/login/getsession'
		}).then(function successCallback(res){
			if(!res.data){
				$scope.loggedIn = false;
				return;
			} else {
				$scope.loggedIn = true;
			}
		})
	}

}]);
