( function() {
	'use strict';

	angular.module('chaiApp.design').controller('DesignCtrl', DesignCtrl);

	DesignCtrl.$inject = ['dataservice', 'analyticsservice'];

	/**@ngInject*/
	function DesignCtrl(dataservice, analyticsservice){
		
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
			//Tracking google analytics view
			analyticsservice.trackPageView();
		}
	}
})();