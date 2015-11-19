var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/', {
		templateUrl: 'trumptweets.html',
		controller: 'myController'
	}).
	when('/hillarytweets',{
		templateUrl: 'hillarytweets.html',
		controller: 'myController'
	}).
	otherwise({
		redirectTo: 'trumptweets.html'
	});

});

myApp.controller('myController', function ($scope, $http, $location){

	var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23trump';
	$http.get(url).success(function(data){
		$scope.data = data.statuses;
		for(i=0; i<$scope.data.length;i++){
			if ($scope.data[i].user.profile_banner_url == null){
				$scope.data[i].user.profile_banner_url = "images/trumpbackground.jpg";
			}
			console.log($scope.data[i].user.profile_banner_url);
		};
		console.log($scope.data);
	});

	$scope.getHillaryTweets = function(){
		var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23hillary';
		$http.get(url).success(function(data2){
			$scope.data2 = data2.statuses;
			for(i=0; i<$scope.data2.length;i++){
				if ($scope.data2[i].user.profile_banner_url == null){
					$scope.data2[i].user.profile_banner_url = "images/hillarybackground.jpg";
				}
				console.log($scope.data2[i].user.profile_banner_url);
			}
		$location.path('/hillarytweets');
	});

	}

});