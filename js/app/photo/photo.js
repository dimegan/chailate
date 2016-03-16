(function() {
	'use strict';

	angular.module('cocoApp.photo').controller('PhotoCtrl', PhotoCtrl);

	function PhotoCtrl(dataservice){
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
		}
	}
})();