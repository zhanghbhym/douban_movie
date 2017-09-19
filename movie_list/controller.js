(function(angular){
	var module = angular.module("movie_list",['ngRoute','http_service']);
	module.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
		.when('/:category/:page',{
			templateUrl:'movie_list/movie_list.html',
			controller:'MovieListController'
		});
	}]);
	module.controller("MovieListController",["$scope","$route","$routeParams","httpService",'app_config',
		function($scope,$route,$routeParams,httpService,app_config){		//参数要与上面顺序一致
			var pageSize = app_config.pageSize;									//每一页显示数量
			var page = parseInt($routeParams.page); 			// 当前第几页
      		var start = (page - 1) * pageSize; 					// 当前页从哪开始
			$scope.loading = true;								//加载动画
			$scope.subjects = [];
			$scope.total = 0;				//电影总数
			$scope.totalPage = 0;			//共几页
			$scope.currentPage = page;		//当前页
			$scope.title = "";				//标题
			httpService.jsonp(app_config.movieListApi + $routeParams.category,
			{count:pageSize,start:start,q:$routeParams.q},
			function (data) {
				$scope.subjects = data.subjects;
				$scope.total = data.total;
				$scope.title = data.title;
				$scope.totalPage = Math.ceil($scope.total / pageSize);
				$scope.loading = false;
				$scope.$apply();			//使用第三方库是需要调用apply进行同步才能显示数据
			});
			//页面跳转函数
			$scope.pageSkip = function(page) {
				if(page >= 1 && page <= $scope.totalPage){
					$route.updateParams({ page:page });
				}
			};
		}
	]);
})(angular);

