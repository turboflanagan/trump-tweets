var tweetSeconds;
var timeDifference;
var allData;

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

myApp.controller('myController', function ($scope, $http, $location, $interval){

	var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23trump';
	$http.get(url).success(function(data){
		$scope.data = data.statuses;
		for(i=0; i<$scope.data.length;i++){
			if ($scope.data[i].user.profile_banner_url == null){
				$scope.data[i].user.profile_banner_url = "images/trumpbackground.jpg";
			}
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			var tweetSeconds = tweetTime.getTime()/1000;
			$scope.data[i].tweetSeconds = tweetSeconds;

		}	
		console.log($scope.data);
		$interval(function(){
			for(i=0; i < $scope.data.length; i++){
				var currentTime = new Date();
				var currentTimeInSeconds = currentTime.getTime()/1000;
				$scope.timeDifference = parseInt(currentTimeInSeconds - $scope.data[i].tweetSeconds);
				$scope.data[i].timeDifference = $scope.timeDifference;
			};
		},1000)	


	});



	$scope.getHillaryTweets = function(){
		var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23hillary';
		$http.get(url).success(function(data2){
			$scope.data2 = data2.statuses;
			for(i=0; i<$scope.data2.length;i++){
				if ($scope.data2[i].user.profile_banner_url == null){
					$scope.data2[i].user.profile_banner_url = "images/hillarybackground.jpg";
				}
				var time = $scope.data2[i].created_at;
				var tweetTime = new Date(time);
				var tweetSeconds = tweetTime.getTime()/1000;
				$scope.data2[i].tweetSeconds = tweetSeconds;

			}
			$interval(function(){
				for(i=0; i < $scope.data2.length; i++){
					var currentTime = new Date();
					var currentTimeInSeconds = currentTime.getTime()/1000;
					$scope.timeDifference = parseInt(currentTimeInSeconds - $scope.data2[i].tweetSeconds);
					$scope.data2[i].timeDifference = $scope.timeDifference;
				};
			},1000)	
		$location.path('/hillarytweets');
	});

	}

});