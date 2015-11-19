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
		console.log($scope.data);
	});

	$scope.getHillaryTweets = function(){

	}

});