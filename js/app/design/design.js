( function() {
	'use strict';

	angular.module('chaiApp.design').controller('DesignCtrl', DesignCtrl);

	/**@ngInject*/
	function DesignCtrl(dataservice, $location, $window){
		
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
			//Tracking google analytics view
			$window.ga('send', 'pageview', {page: $location.url()});
		}
	}
})();