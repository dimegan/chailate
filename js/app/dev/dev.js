(function() {
	'use strict';

	angular.module('chaiApp.dev').
		controller('DevCtrl', DevCtrl);

	function DevCtrl(dataservice, $window, $location){
		var ctrl = this;
		ctrl.portfolio = 'webdev';
		activate();

		function activate(){
			//Tracking google analytics view
			$window.ga('send', 'pageview', {page: $location.url()});
		}
	}
})();