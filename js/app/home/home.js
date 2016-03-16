( function() {
	'use strict';

	angular.module('cocoApp.home').controller('HomeCtrl', HomeCtrl);

	/**@ngInject*/
	function HomeCtrl(dataservice, $routeParams){
		var ctrl = this;
		this.showServDet = showServDet;
		this.hideServDet = hideServDet;
		this.selectedWork = selectedWork;
		this.unselectedWork = unselectedWork;
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
				{scrollTop: contactAnchor.top}, "slow");
		}

		function getWorkGallery(){
			return dataservice.getWorkGallery().
				then(function(data) {
					ctrl.workImages = data;
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
	}
})();