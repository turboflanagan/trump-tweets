$http.get(url).success(function(data3){
	$scope.data3 = data3.statuses;
	var a = ($scope.data2[0].id).indexOf($scope.data3.id);
	for(i=0; i<$scope.data2.length; i++){
		if($scope.data2[0].id == $scope.data3[i].id){
			$scope.counter = i;
			console.log($scope.counter);
		};
	};
	
});