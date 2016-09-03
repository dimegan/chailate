(function() {
	'use strict';

	angular.module('chaiApp.dev').
		controller('DevCtrl', DevCtrl);

	function DevCtrl(dataservice, analyticsservice){
		var ctrl = this;
		ctrl.portfolio = 'webdev';
		activate();

		function activate(){
			//Tracking google analytics view
			analyticsservice.trackPageView();
		}
	}
})();