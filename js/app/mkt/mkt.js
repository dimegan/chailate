(function() {
	'use strict';

	angular.module('chaiApp.mkt').controller('MktCtrl', MktCtrl);

	MktCtrl.$inject = ['dataservice', 'analyticsservice'];

	function MktCtrl(dataservice, analyticsservice){
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
			//Tracking google analytics view
			analyticsservice.trackPageView();
		}
	}
})();