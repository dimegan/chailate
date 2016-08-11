(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getWorkGallery : getWorkGallery,
			getPortfolio : getPortfolio,
			sendComments : sendComments
		};

		return service;

		function getPortfolio(type){
			var serviceUrl = getPortfolioService(type);
			return $http.get(serviceUrl).then(getDesignGallComplete).catch(function (message){
				console.log('Error in getDesignGallery. Message:' + message);
			});

			function getDesignGallComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getWorkGallery(){
			return $http.get('jsons/work-gallery.json').then(getWorkGallComplete).catch(function (message){
				console.log('Error in getDesignGallery. Message:' + message);
			});

			function getWorkGallComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getPortfolioService(type){
			var serviceUrl = '';
			switch(type){
				case 'design':
					serviceUrl = 'jsons/portfolio-diseno.json';
					break;
				case 'photos':
					serviceUrl = 'jsons/portfolio-photos.json';
					break;
				case 'webdev':
					serviceUrl = 'jsons/portfolio-webdev.json';
					break;
			}
			return serviceUrl;
		}

		function sendComments(contact){
			return $http.post(
			  appConfig.apiBaseUrl+'sendmail/',
			  {
				    subject: "Mail de contacto",
				    nameFrom: "Agencia chailate",
				    mailTo: "chailateagencia@gmail.com",
				    nameTo: "Soporte chailate",
				    contactName: contact.name,
				    contactMessage: contact.message,
				    contactEmail: contact.email
				}
			).then(function successCallback(response) {
			    return response;
			  }, function errorCallback(response) {
			    return response;
			  });
		}
	}
})();