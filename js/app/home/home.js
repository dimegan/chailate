( function() {
	'use strict';

	angular.module('chaiApp.home').controller('HomeCtrl', HomeCtrl);

	/**@ngInject*/
	function HomeCtrl(dataservice, $routeParams, $http){
		var homeCtrl = this;
		homeCtrl.showServDet = showServDet;
		homeCtrl.hideServDet = hideServDet;
		homeCtrl.selectedWork = selectedWork;
		homeCtrl.unselectedWork = unselectedWork;
		homeCtrl.sendComments = sendComments;
		activate();

		homeCtrl.contact ={
			name:'',
			email:'',
			message:''
		}

		function activate(){
			getWorkGallery().then( function() {
				console.log('Activated HomeCtrl');	
				setupActiveSection();
			});
		}

		function setupActiveSection(){
			var navSection = $routeParams.nav;
			switch(navSection){
				case 'contact':
					navigateToContact();
					break;
				default:
					//En este caso se mostrará el home
					break;
			}
		}

		function navigateToContact(){
			var contactAnchor =angular.element('#contacto').offset();
			angular.element('body').animate(
				{scrollTop: contactAnchor.top}, "slow");
		}

		function getWorkGallery(){
			return dataservice.getWorkGallery().
				then(function(data) {
					homeCtrl.workImages = data;
					return data;
				});
		}

		//Flag for work gallery animation
		var isSelectedWork = false;
		var workSection = $('.my-work')
		function selectedWork($event, selectedImage){
			if(!isSelectedWork){
				isSelectedWork = true;
				var imgServ = getServiceClass(selectedImage.serviceType);
				workSection.addClass(imgServ);
			}
		}

		function unselectedWork($event, selectedImage){
			isSelectedWork = false;
			var imgServ = getServiceClass(selectedImage.serviceType);
			$('.my-work').removeClass(imgServ);
		}

		//Flag for list service animation
		var slideDownActive = false;

		function showServDet($event){
			/*Parte de la animación se hace en el CSS*/
			if(!slideDownActive){
				slideDownActive = true;
				var cocoServ = $($event.currentTarget);
				/*Show service details using animation*/
				cocoServ.find('.inner-feature').hide()
				cocoServ.find('.inner-feature').fadeIn(600);
			}
		}
		function hideServDet($event){
			/*Parte de la animación se hace en el CSS*/
			slideDownActive = false;
			var cocoServ = $($event.currentTarget);
			/*Show service icon and name using animation*/
			cocoServ.find('.inner-feature').hide()
			cocoServ.find('.inner-feature').fadeIn(600);
			
		}

		function getServiceClass(serviceType){
			var imgServ = "";
			switch(serviceType){
				case 1:
					imgServ = "feature-design";
					break;
				case 2:
					imgServ = "feature-mrkt";
					break;
				case 3:
					imgServ = "feature-photos";
					break;
				case 4:
					imgServ = "feature-dev";
					break;
			}

			return imgServ;
		}

		function sendComments(){

			$http({
			  method: 'POST',
			  url: 'http://104.131.137.249/sendmail/',
			  data: {
				    subject: "Mail de contacto",
				    nameFrom: "Agencia chailate",
				    mailTo: "dimegan@gmail.com",
				    nameTo: "Soporte chailate",
				    contactName: homeCtrl.contact.name,
				    contactMessage: homeCtrl.contact.message,
				    contactEmail: homeCtrl.contact.email
				}
			}).then(function successCallback(response) {
			    console.log(response);
			    homeCtrl.contact.name = '';
			    homeCtrl.contact.message = '';
			    homeCtrl.contact.email = '';
			  }, function errorCallback(response) {
			    console.log(response);
			  });
		}
	}
})();