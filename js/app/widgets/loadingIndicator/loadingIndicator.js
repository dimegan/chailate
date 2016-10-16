(function() {
	'use strict';
	/* The name of the directives must star with lower case*/
	angular.module('chaiApp.widgets').directive('loadingIndicator', loadingIndicator);

	loadingIndicator.$inject = ['$rootScope'];

	function loadingIndicator($rootScope) {
		/*Agregue el template en el código para el tiempo en que ese carge este template en particular sea el minimo*/
		var directive = {
			restrict: 'EA',
		    template: "<div class='container' ng-if='isRouteLoading'><div class='row'><div class='col-md-12 text-center'><h1 class='loading-indicator'>Cargando <i class='fa fa-cog fa-spin'></i></h1></div></div></div>",
		    link: function(scope, elem, attrs) {
		        scope.isRouteLoading = false;

		        $rootScope.$on('$routeChangeStart', function() {
		        	console.log('Is loading = true');
		        });

		        $rootScope.$on('$routeChangeSuccess', function() {
		        	console.log('Is loading = false');
		        });
		    }
		};

		return directive;
	}

})();