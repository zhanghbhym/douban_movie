(function(angular){
	var module = angular.module("movie_detail",['ngRoute','http_service']);
	module.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
		.when('/detail/:id',{
			templateUrl:'movie_detail/movie_detail.html',
			controller:'MovieDetailController'
		});
	}]);
	module.controller("MovieDetailController",["$scope","$route","$routeParams","httpService",'app_config',
		function($scope,$route,$routeParams,httpService,app_config){		//呵呵，参数要与上面顺序一致
			$scope.movie = {};
			var movie_id = $routeParams.id;
			var apiAddress =  app_config.movieDetailApi + movie_id;
			httpService.jsonp(apiAddress,{},function(data){
				$scope.movie = data;
				$scope.$apply();
			});
		}
	]);
})(angular);

