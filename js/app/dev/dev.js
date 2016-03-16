(function() {
	'use strict';

	angular.module('cocoApp.dev').
		controller('DevCtrl', DevCtrl);

	function DevCtrl(dataservice){
		var ctrl = this;
		ctrl.portfolio = 'webdev';
		activate();

		function activate(){
		}
	}
})();