(function() {
	'use strict';

	angular.module('chaiApp.contactData').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [
			{
				url: '/contact-data',
				config: {
					templateUrl: 'js/app/contact-data/contact-data.html',
			        controller: 'ContactDataCtrl',
			        controllerAs: 'contactCtrl'
				}
			}
		];
	}
})();