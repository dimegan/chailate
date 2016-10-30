(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('chaiApp.widgets').directive('devGallery', devGallery);

	devGallery.$inject = ['dataservice', '$timeout', '$window'];

	function devGallery(dataservice, $timeout, $window) {

		var directive = {
			restrict: 'EA',
		    controllerAs: 'vm',
		    templateUrl: 'js/app/widgets/devGallery/dev-gallery.html',
		    scope: {
		      portfoliotype: '='
		    },
		    /*link: link,*/
		    controller: 'DevGalleryCtrl'
		};

		return directive;
	}

})();