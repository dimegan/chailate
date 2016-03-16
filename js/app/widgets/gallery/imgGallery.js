(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('chaiApp.widgets').directive('imageGallery', imageGallery);

	function imageGallery(dataservice, $timeout, $window) {

		var directive = {
			restrict: 'EA',
		    controllerAs: "vm",
		    templateUrl: "js/app/widgets/gallery/img-gallery.html",
		    scope: {
		      portfoliotype: "="
		    },
		    /*link: link,*/
		    controller: 'ImgGalleryCtrl'
		};

		return directive;
	}

})();