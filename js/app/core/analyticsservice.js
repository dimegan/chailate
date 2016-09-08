(function () {
	'use strict';
	
	angular.module('chaiApp.core').factory('analyticsservice', analyticsservice);

	analyticsservice.$inject = ['$http','appConfig', '$window', '$location'];

	function analyticsservice($http, appConfig, $window, $location){
		var service = {
			trackPageView : trackPageView
		};

		return service;

		function trackPageView(){
			if($window.ga){
				$window.ga('send', 'pageview', { page: $location.url() });
			}else{
				console.log('Google analytics is off');
			}
		}
	}
})();