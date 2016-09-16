(function() {
	'use strict';

	angular.module('chaiApp.devDetail').controller('DevDetailCtrl', DevDetailCtrl);

	function DevDetailCtrl(dataservice, analyticsservice, $routeParams){
		var ctrl = this;
		ctrl.portfolio = $routeParams.detailid;
		ctrl.detail = $routeParams.detail;
		activate();

		function activate(){
			//Tracking google analytics view
			console.log('Load dev-detail view');
			analyticsservice.trackPageView();
		}
	}
})();