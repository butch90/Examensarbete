app.directive('navbar', [function(){
	return {
		templateUrl: 'directives/navbar.html'
	}
}]);

app.controller('navbarCtrl', ['$scope', '$http', '$location', '$attrs', '$window', ($scope, $http, $location, $attrs, $window) => {

	$scope.showLogout = false;
	$scope.showLogin = true;

	if(performance.navigation.type == 1){
		var item = $window.localStorage.getItem('loggedIn');
		if(item){
			$scope.showLogout = true;
			$scope.showLogin = false;
		}
	}

	function checkLocalStorageForLoggedIn(){
		var item = $window.localStorage.getItem('loggedIn');
		if(item){
			$scope.showLogout = true;
			$scope.showLogin = false;
		}
	}

	$scope.loginUser = function() {
		if($scope.username != null && $scope.username != '' && $scope.password != null && $scope.password != ''){
			$http({
				method: 'POST',
				url: '/login/user',
				data: {username: $scope.username, password: $scope.password}
			}).then(function successCallback(res){
				if(!res.data){
					$scope.nologin = "Ojsan, glömt bort lösenordet eller användarnamnet?"
					return;
				}
				$window.localStorage.setItem('loggedIn', 'true');
				checkLocalStorageForLoggedIn();
				$window.location.reload();
				$location.path('/');
			}, function errorCallback(res){
				console.log("error");
			});
		} else {
			$scope.error = "Lugn i stormen, du glömde något!";
			console.log("missing credentials in form");
		}
	}

	$scope.logout = function(){
		$http({
			method: 'GET',
			url: '/login/deletesession'
		}).then(function successCallback(res){
			$window.localStorage.clear();
			$scope.showLogout = false;
			$scope.showLogin = true;
		});
	}
}])