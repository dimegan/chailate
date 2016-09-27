(function() {
	'use strict';

	angular.module('chaiApp.dev').
		controller('DevCtrl', DevCtrl);

	DevCtrl.$inject = ['dataservice', 'analyticsservice'];

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