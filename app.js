(function(angular) {
	//主模块
	angular.module('doubanApp',['ngRoute','movie_detail','movie_list','directive_module'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.otherwise({redirectTo:'/in_theaters/1'});
	}])
	//程序配置文件
	.constant('app_config',{
		pageSize: 6,
		movieListApi: 'https://api.douban.com/v2/movie/',
		movieDetailApi: 'https://api.douban.com/v2/movie/subject/'
	})
	//搜索控制器
	.controller('SearchController',['$scope','$route','app_config',
		function($scope,$route,app_config){
			$scope.search_value = '';
			$scope.search = function() {
				$route.updateParams({category:'search',q:$scope.search_value});
			};
		}
	]);
})(angular);
