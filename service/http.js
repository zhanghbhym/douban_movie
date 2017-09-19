(function (angular) {
	var http = angular.module('http_service',[]);
	http.service('httpService',['$window','$document',function($window,$document) {
		this.jsonp = function(url,params,callback){
			var queryParam = url.indexOf('?') == -1 ? '?' :'&';		//查询参数
			for(var key in params){	//遍历data对象里的key
				queryParam += key + '=' + params[key] + '&';		//?count = 2 & start = 1&;
			}
			var randomNum = Math.ceil(Math.random()*100000000);	//取8位随机数
			var cbFunName = 'jsonp_cb_' + randomNum;	  	//回调函数名
			queryParam += 'callback=' + cbFunName;//?count = 2 & start = 1&callback=jsonp_cb123456789;
			$window[cbFunName] =  callback;
			var script = $document[0].createElement('script');
			script.src = url + queryParam;
//			$window[cbFunName] = function(data) {
//				callback(data);
//				$document[0].body.removeChild(script);
//			};
			$document[0].body.appendChild(script);
		};
	}]);
})(angular);
