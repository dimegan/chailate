(function() {
	'use strict';

	angular.module('chaiApp.devDetail').controller('DevDetailCtrl', DevDetailCtrl);

	function DevDetailCtrl(dataservice, analyticsservice, $routeParams, $sce){
		var ctrl = this;
		ctrl.detail = $routeParams.detail;
		ctrl.webdet = {};
		ctrl.description = '';
		activate();

		function activate(){
			getDetails();
			//Tracking google analytics view
			console.log('Load dev-detail view');
			analyticsservice.trackPageView();
		}

		function getDetails(){
			return dataservice.getWebDetails($routeParams.detailid).
				then(function(data) {
					ctrl.webdet = data;
					//solve: attempting to use an unsafe value in a safe context error 
					ctrl.description = $sce.trustAsHtml(data.summary);
					return data;
				});
		}
	}
})();