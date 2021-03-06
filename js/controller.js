
$(document).ready(function(){
	var mainNav = $('#more-tweets');
	var mainNavScroll = 'navbar-scrolled';
	var headerHeight = $('#header').height();

	$(window).scroll(function(){
		if( $(this).scrollTop() > headerHeight){
			mainNav.addClass(mainNavScroll);
			$('#trump-tweets').addClass('margin-adjust');

		}else{
			mainNav.removeClass(mainNavScroll);
			$('#trump-tweets').removeClass('margin-adjust');
		}
	});

});


var tweetSeconds;
var timeDifference;
var allData;
var queryString = 'election2016';
var imageUrl = 'images/republicansdemocrats.jpg;'

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/', {    // When '/' is the end of the url, the default trumptweets page is displayed.
		templateUrl: 'trumptweets.html',
		controller: 'myController'
	}).
	when('/hillarytweets',{      // When '/hillarytweets' ends the url string, hillarytweets page is displayed.
		templateUrl: 'hillarytweets.html',
		controller: 'myController'
	}).
	otherwise({
		redirectTo: 'trumptweets.html'    // --default page to display.
	});

});

myApp.controller('myController', function ($scope, $http, $location, $interval){

	var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23election2016';
	// var url is API address to get tweet info on trump.  
	// The function below gets the JSON data from the API url above and returns an array object.
	// for loop iterates through the data array to 1) get the user's profile banner that we set as the 
	// background image on the trumptweets page.  And 2) get the time the tweet was made.  This is used 
	// to make a timer indicating the interval of time passed since tweet was made.
	$http.get(url).success(function(data){
		$scope.data = data.statuses;
		for(i=0; i<$scope.data.length;i++){
			if ($scope.data[i].user.profile_banner_url == null){
				$scope.data[i].user.profile_banner_url = "images/republicansdemocrats.jpg";
			}
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			var tweetSeconds = tweetTime.getTime()/1000;
			$scope.data[i].tweetSeconds = tweetSeconds;

		}	

		// subtracts the tweet time in seconds from the current time in seconds to set the timer to how many seconds have passed since tweet was made

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


	// Function to get profile banner and tweet time for hillarytweets.
	$scope.getTweets = function(searchString, imageurl){
		var url='http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=%23' + searchString;
		$http.get(url).success(function(data2){
			$scope.data2 = data2.statuses;
			for(i=0; i<$scope.data2.length;i++){
				if ($scope.data2[i].user.profile_banner_url == null){
					$scope.data2[i].user.profile_banner_url = imageurl;
				}
				var time = $scope.data2[i].created_at;
				var tweetTime = new Date(time);
				var tweetSeconds = tweetTime.getTime()/1000;
				$scope.data2[i].tweetSeconds = tweetSeconds;

			}

			// setting the counter for how long ago tweet was made.
			$interval(function(){
				for(i=0; i < $scope.data2.length; i++){
					var currentTime = new Date();
					var currentTimeInSeconds = currentTime.getTime()/1000;
					$scope.timeDifference = parseInt(currentTimeInSeconds - $scope.data2[i].tweetSeconds);
					$scope.data2[i].timeDifference = $scope.timeDifference;
				};

			},1000);

			//Code to check for new tweets.  Unfortunately checking every second
			//will cause twitter to block access to the data.  Trying to check every
			//15 seconds to see if it helps.

			$interval (function(){
				$http.get(url).success(function(data3){
					$scope.data3 = data3.statuses;
					for(i=0; i<$scope.data2.length; i++){
						if($scope.data2[0].id == $scope.data3[i].id){
							$scope.counter = i;
							if($scope.counter > 1){
								$scope.countMessage = ' ' + $scope.counter + ' new tweets to read!';	
							}else if($scope.counter == 1){
								$scope.countMessage = ' ' + $scope.counter + ' new tweet to read!';
							}
						};
					};
					
				});
			},15000);

			$location.path('/hillarytweets');
			queryString = searchString;
			imageUrl = imageurl;

		});
	}
	$scope.updateTweets = function(){
		$scope.countMessage = '';
		$scope.getTweets(queryString, imageUrl);
	}

});



