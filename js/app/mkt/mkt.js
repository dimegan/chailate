(function() {
	'use strict';

	angular.module('cocoApp.mkt').controller('MktCtrl', MktCtrl);

	function MktCtrl(dataservice){
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
		}
	}
})();