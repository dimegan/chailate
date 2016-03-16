(function() {
	'use strict';

	angular.module('chaiApp.photo').controller('PhotoCtrl', PhotoCtrl);

	function PhotoCtrl(dataservice){
		var ctrl = this;
		ctrl.portfolio = 'design';
		activate();

		function activate(){
		}
	}
})();