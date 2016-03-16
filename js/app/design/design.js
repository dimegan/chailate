( function() {
	'use strict';

	angular.module('chaiApp.design').controller('DesignCtrl', DesignCtrl);

	/**@ngInject*/
	function DesignCtrl(dataservice, $timeout, $window){
		
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
		}
	}
})();