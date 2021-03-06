(function () {
	'use strict';

	var core = angular.module('chaiApp.core');

    core.constant('appConfig', 
    {
        apiBaseUrl : 'http://localhost:3000/api/',
        surveyId : '5928e90285f25fe602000004',
        commentQuestId : '5928e90285f25fe602000005'
    });

    /*
    core.constant('appConfig', 
    {
        surveyId : '592ce48f39eb360536000004',
        commentQuestId : '592ce48f39eb360536000005'
    });
    */

    core.config(configure);

    //configure.$inject = ['$routeProvider', 'routehelperConfigProvider', 'locationProvider'];

    function configure ($routeProvider, routehelperConfigProvider, $locationProvider) {

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        // enable HTML5 mode as hashbang-type URLs will not work with mod_rewrite redirection
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
})();