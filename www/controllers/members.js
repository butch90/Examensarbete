app.controller("membersCtrl", ["$scope", "$location", "$http", function($scope, $location, $http) {

	getMembers = function(){
		$http({
			method: 'GET',
			url: '/user/getmembers',
		}).then(function successCallback(res){
			var data = res.data;
			$scope.members = [];
			data.shift();
			data.forEach(function(i){
				delete i.password
			});
			$scope.members = data;
		}, function errorCallback(res){

		})
	}

	if($location.path() == "/members"){
		getMembers();
	}
}]);