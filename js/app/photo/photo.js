(function() {
	'use strict';

	angular.module('chaiApp.photo').controller('PhotoCtrl', PhotoCtrl);

	function PhotoCtrl(dataservice, $window, $location){
		var ctrl = this;
		ctrl.portfolio = 'photos';
		activate();

		function activate(){
			//Tracking google analytics view
			$window.ga('send', 'pageview', {page: $location.url()});
		}
	}
})();