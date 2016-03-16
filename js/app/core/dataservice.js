(function () {
	'use strict';

	angular.module('cocoApp.core').factory('dataservice', dataservice);

	function dataservice($http){
		var service = {
			getWorkGallery : getWorkGallery,
			getPortfolio : getPortfolio
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
					serviceUrl = 'jsons/portfolio-photos.json';
					break;
				case 'webdev':
					serviceUrl = 'jsons/portfolio-webdev.json';
					break;
			}
			return serviceUrl;
		}
	}
})();