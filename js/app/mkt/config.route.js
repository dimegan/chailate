(function() {
	'use strict';

	angular.module('cocoApp.mkt').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [
			{
				url: '/marketing',
				config: {
					templateUrl: 'js/app/mkt/mkt.html',
			        controller: 'MktCtrl',
			        controllerAs: 'mktCtrl'
				}
			}
		];
	}
})();