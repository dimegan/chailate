(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('chaiApp.widgets').directive('coImageModal', coImageModal);

	function coImageModal() {

		var directive = {
			restrict: 'EA',
		    controllerAs: "modal",
		    templateUrl: "js/app/widgets/imageModal/image-modal.html",
		    scope: {
		      currentimg: "="
		    },
		    controller: function(){
		    }
		};

		return directive;
	}
})();