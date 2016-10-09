(function(){
	'use strict';

	angular.module('chaiApp.widgets').controller('ImgGalleryCtrl', ImgGalleryCtrl);

	ImgGalleryCtrl.$inject = ['$scope', 'dataservice', '$timeout', '$window'];

	function ImgGalleryCtrl($scope, dataservice, $timeout, $window){
		var vm = this;
        vm.portafolio = [];
        vm.showModal = showModal;
        vm.selectedPhoto = null;
        activate();

        function activate(){
        	getPortfolio($scope.portfoliotype).then( function(data) {
				console.log('Activated ImageGallery');
				vm.portafolio = data;
				setupCapionClass(data);
				bindScrollEvent(data);
			});
        }

        function getPortfolio(portfoliotype){
			return dataservice.getPortfolio(portfoliotype).
				then(function(data) {
					return data;
				});
		}

		function bindScrollEvent(){
			//innerHeight = view port size
        	//body.offsetHeight = html document size
        	if($window.innerHeight >document.body.offsetHeight){
        		//When viw port is bigger to document height after page is load
        		//must trigger display images animation
        		hideImages();
        		showImages(0);
        	}else{

        		//When view port is smaller to document height star the animation 
        		//when user scroll to the bottom of the page
        		var isActiveAnimation = false;
        		var portafolioWrapper = $(document.getElementById("photos-portfolio"));
        		var pixForStart = 100;
				angular.element($window).bind("scroll", function() {
		        	
		             // Obtenemos la posicion del scroll en pantalla
	            	if (!isActiveAnimation && ($window.innerHeight + window.scrollY) >= 
	            		(portafolioWrapper.offset().top + pixForStart)) {
	            		isActiveAnimation = true;
	            		//Hacemos visibles las imagenes cuando el usuario llega al final 
	            		//de la página
	            		hideImages();
	            		showImages(0)		
	            	}
		        });
			}
		}

		function showModal($event, photo){
			$event.preventDefault();
			vm.selectedPhoto = photo;
			$('#imgModal').modal({});
			//Tracking google analytics event
			$window.ga('send', {
			  hitType: 'event',
			  eventCategory: 'show-image',
			  eventAction: 'click',
			  eventLabel: photo.title
			});
		}

		/*Helpers*/

		/*Animation for gallery*/
		//Hace visible una foto cada 400 ms
		function showImages(index){
			var animTime = index > 0 ? 400 : 0;
			$timeout(
			  function() 
			  {
			  	if(index < vm.portafolio.length){
			  		
			  		var item = vm.portafolio[index];
			  		item.isVisible = true;
			  		item.myClass = 'fadeIn';
			  		index++;
					showImages(index);
				}
			  }, animTime
			);
		}

		function hideImages(){
			for(var i = 0; i <  vm.portafolio.length; i++){
				 vm.portafolio[i].isVisible = false;
			}
		}

		function setupCapionClass(arrayItems){
			var index = 0;
			var captionClass = '';
			for(var i=0; i < arrayItems.length; i++){

				switch(index){
					case 0:
						captionClass = 'azul';
						break;
					case 1:
						captionClass = 'turquesa';
						break;
					case 2:
						captionClass = 'rojo';
						break;
					case 3:
						captionClass = 'rosa';
						break;
				}
				arrayItems[i].captionClass =captionClass;
				index++;

				if(index > 3){
					index = 0;
				}
			}

		}
	}

})();