$http.get(url).success(function(data3){
		$scope.data3 = data3.statuses;
		console.log('data3 below');
		var a = ($scope.data2[0].id).indexOf($scope.data3.id);
		console.log("index is below");
		console.log(a);
		$scope.tweetDifference = $scope.data3.length
		
	});