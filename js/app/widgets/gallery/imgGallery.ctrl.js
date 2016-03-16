(function(){
	'use strict';

	angular.module('cocoApp.widgets').controller('ImgGalleryCtrl', ImgGalleryCtrl);

	function ImgGalleryCtrl($scope, dataservice, $timeout, $window){
		var vm = this;
        vm.portafolio = [];
        vm.showModal = showModal;
        vm.selectedPhoto = null;
        activate();

        function activate(){
        	getPortfolio($scope.portfoliotype).then( function(data) {
				console.log('Activated ImageGallery');
				bindScrollEvent(data);
			});
        }

        function getPortfolio(portfoliotype){
			return dataservice.getPortfolio(portfoliotype).
				then(function(data) {
					vm.portafolio = data;
					return data;
				});
		}

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

		function bindScrollEvent(){
			//innerHeight = view port size
        	//body.offsetHeight = html document size
        	if($window.innerHeight >document.body.offsetHeight){
        		//When viw port is bigger to document height after page is load
        		//must trigger display images animation
        		showImages(0)
        	}else{
        		//When view port is smaller to document height star the animation 
        		//when user scroll to the bottom of the page
        		var isActiveAnimation = false;
				angular.element($window).bind("scroll", function() {
		             
		             // Obtenemos la posicion del scroll en pantalla
	            	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
	            	if (!isActiveAnimation && ($window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	            		isActiveAnimation = true;
	            		//Hacemos visibles las imagenes cuando el usuario llega al final 
	            		//de la página
	            		showImages(0)		
	            	}
		        });
			}
		}

		function showModal($event, photo){
			$event.preventDefault();
			vm.selectedPhoto = photo;
			$('#imgModal').modal({});
		}
	}

})();