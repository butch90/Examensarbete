app.controller("adminCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
	$scope.created = "";

	$scope.listNewRegistrations = function(){
		$scope.users = "";
		$scope.deletedimage = "";
		$scope.regs = "All current registrations loaded";
		$http({
			method: 'GET',
			url: '/user/getregistrations',
		}).then(function successCallback(res){
			$scope.moviesUrls = [];
			$scope.allImages = [];
			$scope.newRegistrations = res.data;
		}, function errorCallback(res){

		})
	}

	$scope.deniedRegistration = function(data){
		var id = data._id;
		if(data.title === "reg"){
			$http({
				method: 'DELETE',
				url: '/user/deniedregistration/'+ id,
			}).then(function successCallback(res){
				if(!res.data){
					$scope.error = "Could not delete registration.";
					return;
				}
				$scope.removed = "Registration removed!";
				$scope.listNewRegistrations();
			})
		} else {
			$http({
				method: 'DELETE',
				url: '/user/deniedaccount/'+ id,
			}).then(function successCallback(res){
				if(!res.data){
					$scope.error = "Could not delete user.";
					return;
				}
				$scope.removed = "User removed!";
				$scope.loadAllUsers();
			})
		}
	}

	$scope.createNewUser = function(data){
		var email = data.email,
				firstname = data.firstname,
				lastname = data.lastname,
				password = data.password,
				username = data.username,
				title = 'admin';
		$http({
			method: 'POST',
			url: '/user/createnewuser',
			data: {email: email, firstname: firstname, lastname: lastname, password: password, username: username, title: title}
		}).then(function successCallback(res){
			if(!res.data){
				console.log("error indeed")
				return;
			}
			$scope.created = "New user created!"
			$scope.deniedRegistration(data);
		})
	}

	$scope.loadAllUsers = function(){
		$scope.regs = "";
		$scope.deletedimage = "";
		$scope.users = "All current users loaded";
		$http({
			method: 'GET',
			url: '/user/getusers',
		}).then(function successCallback(res){
			console.log(res.data);
			$scope.moviesUrls = [];
			$scope.allImages = [];
			$scope.newRegistrations = [];
			$scope.newRegistrations = res.data;
		}, function errorCallback(res){

		})
	}

	isAdmin = function(){
		$http({
			method: 'get',
			url: '/login/gettitle'
		}).then(function successCallback(res){
			if(res.data != 'admin'){
				$location.path('/');
				return;
			}
		})
	}

	$scope.loadAllImg = function(){
		$scope.regs = "";
		$scope.users = "";
		$http({
			method: 'get',
			url: '/fs/getallimages'
		}).then(function successCallback(res){
			$scope.moviesUrls = [];
			$scope.allImages = [];
			$scope.allImages = res.data;
			$scope.newRegistrations = [];
			$scope.deletedimage = 'All images from database';
		})
	}

	$scope.myImages = {
		ids:{}
	}

	$scope.deleteImage = function(){
		var myImages = $scope.myImages;
		var id = myImages.ids;
		var propid = '';
		for(prop in id){
			propid = prop;
			$http({
				method: 'delete',
				url: '/fs/deleteimage/' + propid
			}).then(function successCallback(res){
				$scope.loadAllImg();
			})
		}
	}

	$scope.getMovieUrls = function(){
		$http({
			method: 'get',
			url: '/fs/getvideourls'
		}).then(function successCallback(res){
			$scope.allImages = [];
			$scope.newRegistrations = [];
			$scope.moviesUrls = res.data;
		}, function errorCallback(res){
			console.log("err");
		})
	}

	$scope.myVideos = {
		ids:{}
	}

	$scope.deleteVideo = function(){
		var myVideos = $scope.myVideos;
		var id = myVideos.ids;
		var propid = '';
		for(prop in id){
			propid = prop;
			$http({
				method: 'delete',
				url: '/fs/deletevideo/' + propid
			}).then(function successCallback(res){
				$scope.getMovieUrls();
			}, function errorCallback(res){
				console.log(err);
			})
		}
	}

	if($location.path() == '/admin'){
		isAdmin();
		$scope.listNewRegistrations();
	}

}]);