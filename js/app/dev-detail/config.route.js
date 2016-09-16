(function() {
	'use strict';

	angular.module('chaiApp.devDetail').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [
			{
				url: '/web/:detailid/:detail/',
				config: {
					templateUrl: 'js/app/dev-detail/dev-detail.html',
			        controller: 'DevDetailCtrl',
			        controllerAs: 'devCtrl'
				}
			}
		];
	}
})();