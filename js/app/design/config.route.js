(function () {
	'use strict';
	angular.module('chaiApp.design').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/diseno',
				config: {
					templateUrl: 'js/app/design/design.html',
			        controller: 'DesignCtrl',
			        controllerAs: 'designCtrl'
				}
			}
		];
	}

})();