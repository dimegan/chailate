(function() {
	'use strict';

	angular.module('chaiApp.mkt').controller('MktCtrl', MktCtrl);

	function MktCtrl(dataservice, $window, $location){
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
			//Tracking google analytics view
			$window.ga('send', 'pageview', {page: $location.url()});
		}
	}
})();