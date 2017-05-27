(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getWorkGallery : getWorkGallery,
			getPortfolio : getPortfolio,
			sendComments : sendComments,
			getWebDetails : getWebDetails,
			saveAnswer : saveAnswer
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

		function getWebDetails(id){
			return $http.get('jsons/portfolio-webdev.json').then(getSelectedItem).catch(function (message){
				console.log('Error in getSelectedItem. Message:' + message);
			});

			function getSelectedItem(result, status, headers, config){
				var selected = {};
				var items = result.data;
				//Parese id string to number
				id =  Number(id);
				for(var i = 0; i < items.length; i++){
					if(items[i].id === id){
						selected = items[i];
					}
				}
				return selected;
			}
		}

		function sendComments(contact){
			return $http.post(
			  appConfig.apiBaseUrl+'sendmail/',
			  {
				    subject: 'Mail de contacto',
				    nameFrom: 'Agencia chailate',
				    mailTo: 'chailateagencia@gmail.com',
				    nameTo: 'Soporte chailate',
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

		function saveAnswer(contact){
			
			var answer = buildAnswerForSave(contact);
			var jsonAnswer = JSON.stringify(answer);
			var serviceUrl = appConfig.apiBaseUrl + 'answers';

			return $http.post(serviceUrl, jsonAnswer)
				.then(saveAnswerComplete);

			function saveAnswerComplete(data, status, headers, config){
				return data.data;
			}
		}

		/*Helpers*/
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

		function buildAnswerForSave(contact){
			//Setup contact data string
			var contactData = 'Name: ' + contact.name + ' <br>' +
				'Email: ' + contact.email + ' <br>' + 
				'Message: ' + contact.message;
			
			var answerDet = {
					questionId : appConfig.commentQuestId,
					value : contactData
				};

			var details = [];
			details.push(answerDet);

			var answer = {
					surveyId : appConfig.surveyId,
					key : 'contact-data',
					usedTime : 0,
					details : details
				};

			return answer;
		}
	}
})();