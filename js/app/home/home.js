( function() {
	'use strict';

	angular.module('chaiApp.home').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['dataservice', '$routeParams', '$http'];

	/**@ngInject*/
	function HomeCtrl(dataservice, $routeParams, $http){
		var homeCtrl = this;
		homeCtrl.showServDet = showServDet;
		homeCtrl.hideServDet = hideServDet;
		homeCtrl.selectedWork = selectedWork;
		homeCtrl.unselectedWork = unselectedWork;
		homeCtrl.sendComments = sendComments;
		homeCtrl.showContactForm = showContactForm;
		homeCtrl.showContact = true;
		//Model used for contact form
		homeCtrl.contact ={
			name:'',
			email:'',
			message:''
		};
		//Model used for contact error message
		homeCtrl.contactError = {
			show: false,
			message: ''
		};
		

		//Initialize controller
		activate();

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
				{scrollTop: contactAnchor.top}, 'slow');
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
		var workSection = $('.my-work');
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
				cocoServ.find('.inner-feature').hide();
				cocoServ.find('.inner-feature').fadeIn(600);
			}
		}
		function hideServDet($event){
			/*Parte de la animación se hace en el CSS*/
			slideDownActive = false;
			var cocoServ = $($event.currentTarget);
			/*Show service icon and name using animation*/
			cocoServ.find('.inner-feature').hide();
			cocoServ.find('.inner-feature').fadeIn(600);
			
		}

		function getServiceClass(serviceType){
			var imgServ = '';
			switch(serviceType){
				case 1:
					imgServ = 'feature-design';
					break;
				case 2:
					imgServ = 'feature-mrkt';
					break;
				case 3:
					imgServ = 'feature-photos';
					break;
				case 4:
					imgServ = 'feature-dev';
					break;
			}

			return imgServ;
		}

		function sendComments(){
			if(validateContactForm()){
				homeCtrl.showContact = false;

				//Send email with contact message
				dataservice.sendComments(homeCtrl.contact).
					then(function(data) {
					    homeCtrl.contact.name = '';
					    homeCtrl.contact.message = '';
					    homeCtrl.contact.email = '';
						return data;
					});
			}
		}

		function showContactForm(){
			homeCtrl.showContact = true;
		}

		/*Helpers*/
		function validateContactForm(){
			var contactEmail = homeCtrl.contact.email;
			if(contactEmail.length === 0){
				homeCtrl.contactError.message = 'Ingresa un mail para poder enviar tu comentario';
			}else{
				if(!validateEmail(contactEmail)){
					homeCtrl.contactError.message = 'Ingresa un email valido para poder enviar tu comentario';
				}else{
					//Si no hubo errores ocultamos la caja de errores
					homeCtrl.contactError.show = false;
					return true;	
				}
			}
			//Si hubo errores mostramos la caja de errores
			homeCtrl.contactError.show = true;
			return false;
		}

		function validateEmail(email) {
		  var urlRegex= new RegExp(''+ 
		  	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))/.source + 
		  	/@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source
		  );
		  return urlRegex.test(email);
		}
	}
})();