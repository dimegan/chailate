(function() {
	'use strict';

	angular.module('chaiApp.mkt').run(appRun);

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