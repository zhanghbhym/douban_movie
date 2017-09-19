(function(angular) {
	angular.module('directive_module',[])
	.directive('addActive',['$location',function($location){
		return{
			restrict:'AE',
			link:function(scope,element,attrs){
				scope.$location = $location;
				scope.$watch('$location.path()',function(now){
					var a_href = element.children().attr('href');
					//console.log(a_href);		//	--> #/in_theaters/1
					var begin = a_href.indexOf('/');
					var end	= a_href.lastIndexOf('/');
					var category = a_href.substring(begin,end);		//-->/in_theaters
	//				console.log(category);
					if(now.startsWith(category)){
						element.parent().children().removeClass('active');
						element.addClass('active');
					}
				});
			}
		};
	}]);
})(angular);
