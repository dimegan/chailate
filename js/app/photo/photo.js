(function() {
	'use strict';

	angular.module('chaiApp.photo').controller('PhotoCtrl', PhotoCtrl);

	function PhotoCtrl(dataservice, analyticsservice){
		var ctrl = this;
		ctrl.portfolio = 'photos';
		activate();

		function activate(){
			//Tracking google analytics view
			analyticsservice.trackPageView();
		}
	}
})();