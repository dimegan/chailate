(function () {
	'use strict';

	var core = angular.module('cocoApp.core');

	//core.value('config', config);

    core.config(configure);

    function configure ($routeProvider, routehelperConfigProvider) {

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
        /*
        var resolveAlways = { 
            ready: function(dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };*/
        //routehelperConfigProvider.config.resolveAlways = resolveAlways;
    }
})();