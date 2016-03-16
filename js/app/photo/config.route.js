(function() {
	'use strict';

	angular.module('cocoApp.photo').run(appRun);

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