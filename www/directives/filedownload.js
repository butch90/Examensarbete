app.directive('showFiles', function (){
	return {
		templateUrl: 'directives/filedownload.html'
	}
})

app.controller('filedownloadCtrl', ['$scope', '$http', '$location', '$attrs', '$document', ($scope, $http, $location, $attrs, $document) => {

	$scope.loggedIn;

	showFiles = function(){
		$http({
			method: 'GET',
			url: '/fs/getfilename'
		}).then(function successCallback (data){
			var newNameArray = [];
			var newIdArray = [];

			var nameArray = data.data;
			nameArray.forEach(name => {
				newNameArray.push(name.fileName);
			});
			
			var idArray = data.data;
			idArray.forEach(id => {
				newIdArray.push(id._id);
			});

			$scope.pictureLoader = newNameArray.map((value, index) => {
				return {
					data: value,
					value: newIdArray[index]
				}
			});
		}, function errorCallback (data){
			console.log('error on retriving filename');
		})
	}
	
	$scope.enlargePicture = function(path){
		console.log(path);
		$scope.path = path;
		$('#myModal').modal('show');
	}

	$scope.destroyModal = function(){
		$('#myModal').modal('hide');
	}

	if($location.path() == '/photos'){
		showFiles();
		$scope.checkForLoggedIn();
	}
}])
