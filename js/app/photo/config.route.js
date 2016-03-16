(function() {
	'use strict';

	angular.module('chaiApp.photo').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [
			{
				url: '/sesiones-fotos',
				config: {
					templateUrl: 'js/app/photo/photo.html',
			        controller: 'PhotoCtrl',
			        controllerAs: 'photoCtrl'
				}
			}
		];
	}
})();