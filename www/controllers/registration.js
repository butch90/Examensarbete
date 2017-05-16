app.controller("regCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
	$scope.error = '';

	$scope.regNewUser = function(){
		if($scope.username != null && $scope.username != '' && $scope.password != null && $scope.password != '' && $scope.repassword != null && $scope.repassword != '' && $scope.email != null && $scope.email != '' && $scope.firstname != null && $scope.firstname != '' && $scope.lastname != null && $scope.lastname != ''){
				if($scope.password === $scope.repassword){
					var title = 'reg';
					$http({
						method: 'POST',
						url: '/user/newregistration',
						data: {username: $scope.username, firstname: $scope.firstname, lastname: $scope.lastname, password: $scope.password, email: $scope.email, title: title}
					}).then(function successCallback(res){
						$scope.created = "Tack för din registrering, en administratör kommer lägga till dig efter verifiering skett. Ett mail kommer skickas när du kan logga in."
						
					}, function errorCallback(res){
						console.log("error");
					});
					return
			}else {
				$scope.error = "Both passwords must match!";
				return;
			}
		} else {
			$scope.error = "Wow, missing something maybe?";
			console.log("missing credentials in form");
		}
	}
}]);