app.controller("photosCtrl", ["$scope", "$http", function($scope, $http) {
	
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