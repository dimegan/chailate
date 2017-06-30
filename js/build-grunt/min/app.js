!function(){"use strict";angular.module("chaiApp",["chaiApp.core","chaiApp.widgets","chaiApp.home","chaiApp.design","chaiApp.dev","chaiApp.photo","chaiApp.devDetail","chaiApp.contactData"])}();
!function(){"use strict";angular.module("blocks.router",["ngRoute"])}();
!function(){"use strict";angular.module("chaiApp.contactData",[])}();
!function(){"use strict";angular.module("chaiApp.core",["ngRoute","blocks.router"])}();
!function(){"use strict";angular.module("chaiApp.design",[])}();
!function(){"use strict";angular.module("chaiApp.devDetail",[])}();
!function(){"use strict";angular.module("chaiApp.dev",[])}();
!function(){"use strict";angular.module("chaiApp.home",[])}();
!function(){"use strict";angular.module("chaiApp.mkt",[])}();
!function(){"use strict";angular.module("chaiApp.photo",[])}();
!function(){"use strict";angular.module("chaiApp.widgets",[])}();
!function(){"use strict";function routehelperConfig(){this.config={},this.$get=function(){return{config:this.config}}}function routehelper($location,$rootScope,$route,routehelperConfig){function configureRoutes(routes){routes.forEach(function(route){route.config.resolve=angular.extend(route.config.resolve||{},routehelperConfig.config.resolveAlways),$routeProvider.when(route.url,route.config)}),$routeProvider.otherwise({redirectTo:"/"})}function handleRoutingErrors(){$rootScope.$on("$routeChangeError",function(event,current,previous,rejection){if(!handlingRouteChangeError){routeCounts.errors++,handlingRouteChangeError=!0;var destination=current&&(current.title||current.name||current.loadedTemplateUrl)||"unknown target";"Error routing to "+destination+". "+(rejection.msg||"");$location.path("/")}})}function init(){handleRoutingErrors(),updateDocTitle()}function getRoutes(){for(var prop in $route.routes)if($route.routes.hasOwnProperty(prop)){var route=$route.routes[prop],isRoute=!!route.title;isRoute&&routes.push(route)}return routes}function updateDocTitle(){$rootScope.$on("$routeChangeSuccess",function(event,current,previous){routeCounts.changes++,handlingRouteChangeError=!1;var title=routehelperConfig.config.docTitle+" "+(current.title||"");$rootScope.title=title})}var handlingRouteChangeError=!1,routeCounts={errors:0,changes:0},routes=[],$routeProvider=routehelperConfig.config.$routeProvider,service={configureRoutes:configureRoutes,getRoutes:getRoutes,routeCounts:routeCounts};return init(),service}angular.module("blocks.router").provider("routehelperConfig",routehelperConfig).factory("routehelper",routehelper),routehelper.$inject=["$location","$rootScope","$route","routehelperConfig"]}();
!function(){"use strict";function ContactDataCtrl(dataservice,analyticsservice,$sce){function activate(){analyticsservice.trackPageView(),getContactData()}function getContactData(){return dataservice.getContactData().then(function(data){return data.forEach(function(info){info.details[0].value=$sce.trustAsHtml(info.details[0].value)}),ctrl.contactData=data,data})}var ctrl=this;ctrl.contactData=null,activate()}angular.module("chaiApp.contactData").controller("ContactDataCtrl",ContactDataCtrl),ContactDataCtrl.$inject=["dataservice","analyticsservice","$sce"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/contact-data",config:{templateUrl:"js/app/contact-data/contact-data.html",controller:"ContactDataCtrl",controllerAs:"contactCtrl"}}]}angular.module("chaiApp.contactData").run(appRun)}();
!function(){"use strict";function analyticsservice($http,appConfig,$window,$location){function trackPageView(){$window.ga?$window.ga("send","pageview",{page:$location.url()}):reportAnalyticsOff()}function trackEvent(category,action,info){$window.ga?$window.ga("send",{hitType:"event",eventCategory:category,eventAction:action,eventLabel:info}):reportAnalyticsOff()}function reportAnalyticsOff(){console.log("GOOGLE ANALYTICS IS OFF")}var service={trackPageView:trackPageView,trackEvent:trackEvent};return service}angular.module("chaiApp.core").factory("analyticsservice",analyticsservice),analyticsservice.$inject=["$http","appConfig","$window","$location"]}();
!function(){"use strict";function configure($routeProvider,routehelperConfigProvider,$locationProvider){routehelperConfigProvider.config.$routeProvider=$routeProvider,routehelperConfigProvider.config.docTitle="NG-Modular: ",$locationProvider.html5Mode(!0).hashPrefix("!")}var core=angular.module("chaiApp.core");core.constant("appConfig",{apiBaseUrl:"http://138.197.206.181/api/",surveyId:"592ce48f39eb360536000004",commentQuestId:"592ce48f39eb360536000005"}),core.config(configure)}();
!function(){"use strict";function dataservice($http,appConfig){function getPortfolio(type){function getDesignGallComplete(data,status,headers,config){return data.data}var serviceUrl=getPortfolioService(type);return $http.get(serviceUrl).then(getDesignGallComplete).catch(function(message){console.log("Error in getDesignGallery. Message:"+message)})}function getWorkGallery(){function getWorkGallComplete(data,status,headers,config){return data.data}return $http.get("jsons/work-gallery.json").then(getWorkGallComplete).catch(function(message){console.log("Error in getDesignGallery. Message:"+message)})}function getWebDetails(id){function getSelectedItem(result,status,headers,config){var selected={},items=result.data;id=Number(id);for(var i=0;i<items.length;i++)items[i].id===id&&(selected=items[i]);return selected}return $http.get("jsons/portfolio-webdev.json").then(getSelectedItem).catch(function(message){console.log("Error in getSelectedItem. Message:"+message)})}function saveAnswer(contact){function saveAnswerComplete(data,status,headers,config){return data.data}var answer=buildAnswerForSave(contact),jsonAnswer=JSON.stringify(answer),serviceUrl=appConfig.apiBaseUrl+"answers";return $http.post(serviceUrl,jsonAnswer).then(saveAnswerComplete)}function getContactData(){function getLastAnswerComplete(data,status,headers,config){return data.data}var serviceUrl=(new Date,appConfig.apiBaseUrl+"answer-by-survey/"+appConfig.surveyId);return $http.get(serviceUrl).then(getLastAnswerComplete).catch(function(message){console.log("Error in getLastAnswer. Message:"+message)})}function getPortfolioService(type){var serviceUrl="";switch(type){case"design":serviceUrl="jsons/portfolio-diseno.json";break;case"photos":serviceUrl="jsons/portfolio-photos.json";break;case"webdev":serviceUrl="jsons/portfolio-webdev.json"}return serviceUrl}function buildAnswerForSave(contact){var contactData="Name: "+contact.name+" <br>Email: "+contact.email+" <br>Message: "+contact.message,answerDet={questionId:appConfig.commentQuestId,value:contactData},details=[];details.push(answerDet);var answer={surveyId:appConfig.surveyId,key:"contact-data",usedTime:0,details:details};return answer}var service={getWorkGallery:getWorkGallery,getPortfolio:getPortfolio,getWebDetails:getWebDetails,saveAnswer:saveAnswer,getContactData:getContactData};return service}angular.module("chaiApp.core").factory("dataservice",dataservice),dataservice.$inject=["$http","appConfig"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/diseno",config:{templateUrl:"js/app/design/design.html",controller:"DesignCtrl",controllerAs:"designCtrl"}}]}angular.module("chaiApp.design").run(appRun)}();
!function(){"use strict";function DesignCtrl(dataservice,analyticsservice){function activate(){analyticsservice.trackPageView()}var ctrl=this;ctrl.portfolio="design",activate()}angular.module("chaiApp.design").controller("DesignCtrl",DesignCtrl),DesignCtrl.$inject=["dataservice","analyticsservice"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/web/:detailid/:detail/",config:{templateUrl:"js/app/dev-detail/dev-detail.html",controller:"DevDetailCtrl",controllerAs:"devCtrl"}}]}angular.module("chaiApp.devDetail").run(appRun)}();
!function(){"use strict";function DevDetailCtrl(dataservice,analyticsservice,$routeParams,$sce){function activate(){getDetails(),console.log("Load dev-detail view"),analyticsservice.trackPageView()}function getDetails(){return dataservice.getWebDetails($routeParams.detailid).then(function(data){return ctrl.webdet=data,ctrl.webdet.showLink=data.url.length>0,ctrl.webdet.description=$sce.trustAsHtml(data.summary),data})}var ctrl=this;ctrl.detail=$routeParams.detail,ctrl.webdet={},ctrl.description="",activate()}angular.module("chaiApp.devDetail").controller("DevDetailCtrl",DevDetailCtrl),DevDetailCtrl.$inject=["dataservice","analyticsservice","$routeParams","$sce"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/desarrollo-web",config:{templateUrl:"js/app/dev/dev.html",controller:"DevCtrl",controllerAs:"devCtrl"}}]}angular.module("chaiApp.dev").run(appRun)}();
!function(){"use strict";function DevCtrl(dataservice,analyticsservice){function activate(){analyticsservice.trackPageView()}var ctrl=this;ctrl.portfolio="webdev",activate()}angular.module("chaiApp.dev").controller("DevCtrl",DevCtrl),DevCtrl.$inject=["dataservice","analyticsservice"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/",config:{templateUrl:"js/app/home/home.html",controller:"HomeCtrl",controllerAs:"homeCtrl"}}]}angular.module("chaiApp.home").run(appRun)}();
!function(){"use strict";function HomeCtrl(dataservice,$routeParams,$http){function activate(){getWorkGallery().then(function(){console.log("Activated HomeCtrl"),setupActiveSection()})}function setupActiveSection(){var navSection=$routeParams.nav;switch(navSection){case"contact":navigateToContact()}}function navigateToContact(){var contactAnchor=angular.element("#contacto").offset();angular.element("body").animate({scrollTop:contactAnchor.top},"slow")}function getWorkGallery(){return dataservice.getWorkGallery().then(function(data){return homeCtrl.workImages=data,data})}function selectedWork($event,selectedImage){if(!isSelectedWork){isSelectedWork=!0;var imgServ=getServiceClass(selectedImage.serviceType);workSection.addClass(imgServ)}}function unselectedWork($event,selectedImage){isSelectedWork=!1;var imgServ=getServiceClass(selectedImage.serviceType);$(".my-work").removeClass(imgServ)}function showServDet($event){if(!slideDownActive){slideDownActive=!0;var cocoServ=$($event.currentTarget);cocoServ.find(".inner-feature").hide(),cocoServ.find(".inner-feature").fadeIn(600)}}function hideServDet($event){slideDownActive=!1;var cocoServ=$($event.currentTarget);cocoServ.find(".inner-feature").hide(),cocoServ.find(".inner-feature").fadeIn(600)}function getServiceClass(serviceType){var imgServ="";switch(serviceType){case 1:imgServ="feature-design";break;case 2:imgServ="feature-mrkt";break;case 3:imgServ="feature-photos";break;case 4:imgServ="feature-dev"}return imgServ}function sendComments(){validateContactForm()&&(homeCtrl.showContact=!1,dataservice.saveAnswer(homeCtrl.contact).then(function(data){return homeCtrl.contact.name="",homeCtrl.contact.message="",homeCtrl.contact.email="",data}))}function showContactForm(){homeCtrl.showContact=!0}function validateContactForm(){var contactEmail=homeCtrl.contact.email;if(0===contactEmail.length)homeCtrl.contactError.message="Ingresa un mail para poder enviar tu comentario";else{if(validateEmail(contactEmail))return homeCtrl.contactError.show=!1,!0;homeCtrl.contactError.message="Ingresa un email valido para poder enviar tu comentario"}return homeCtrl.contactError.show=!0,!1}function validateEmail(email){var urlRegex=new RegExp(""+/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))/.source+/@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source);return urlRegex.test(email)}var homeCtrl=this;homeCtrl.showServDet=showServDet,homeCtrl.hideServDet=hideServDet,homeCtrl.selectedWork=selectedWork,homeCtrl.unselectedWork=unselectedWork,homeCtrl.sendComments=sendComments,homeCtrl.showContactForm=showContactForm,homeCtrl.showContact=!0,homeCtrl.contact={name:"",email:"",message:""},homeCtrl.contactError={show:!1,message:""},activate();var isSelectedWork=!1,workSection=$(".my-work"),slideDownActive=!1}angular.module("chaiApp.home").controller("HomeCtrl",HomeCtrl),HomeCtrl.$inject=["dataservice","$routeParams","$http"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/marketing",config:{templateUrl:"js/app/mkt/mkt.html",controller:"MktCtrl",controllerAs:"mktCtrl"}}]}angular.module("chaiApp.mkt").run(appRun)}();
!function(){"use strict";function MktCtrl(dataservice,analyticsservice){function activate(){analyticsservice.trackPageView()}var ctrl=this;ctrl.portfolio="design",activate()}angular.module("chaiApp.mkt").controller("MktCtrl",MktCtrl),MktCtrl.$inject=["dataservice","analyticsservice"]}();
!function(){"use strict";function appRun(routehelper){routehelper.configureRoutes(getRoutes())}function getRoutes(){return[{url:"/sesiones-fotos",config:{templateUrl:"js/app/photo/photo.html",controller:"PhotoCtrl",controllerAs:"photoCtrl"}}]}angular.module("chaiApp.photo").run(appRun)}();
!function(){"use strict";function PhotoCtrl(dataservice,analyticsservice){function activate(){analyticsservice.trackPageView()}var ctrl=this;ctrl.portfolio="photos",activate()}angular.module("chaiApp.photo").controller("PhotoCtrl",PhotoCtrl),PhotoCtrl.$inject=["dataservice","analyticsservice"]}();
!function(){"use strict";function DevGalleryCtrl($scope,dataservice,$timeout,$window,$location){function activate(){getPortfolio($scope.portfoliotype).then(function(data){console.log("Activated DevGallery"),setupUrlFriendly(data),setupCapionClass(data),vm.portafolio=data,bindScrollEvent(data)})}function getPortfolio(portfoliotype){return dataservice.getPortfolio(portfoliotype).then(function(data){return data})}function bindScrollEvent(){if($window.innerHeight>document.body.offsetHeight)hideImages(),showImages(0);else{var isActiveAnimation=!1,portafolioWrapper=$(document.getElementById("photos-portfolio")),pixForStart=100;angular.element($window).bind("scroll",function(){!isActiveAnimation&&$window.innerHeight+window.scrollY>=portafolioWrapper.offset().top+pixForStart&&(isActiveAnimation=!0,hideImages(),showImages(0))})}}function showModal($event,photo){vm.selectedPhoto=photo}function setupUrlFriendly(items){for(var i=0;i<items.length;i++){var title=items[i].title;items[i].linktitle=encodeURI(title.replace(/\s/g,"-"))}}function showImages(index){var animTime=index>0?400:0;$timeout(function(){if(index<vm.portafolio.length){var item=vm.portafolio[index];item.isVisible=!0,item.myClass="fadeIn",index++,showImages(index)}},animTime)}function hideImages(){for(var i=0;i<vm.portafolio.length;i++)vm.portafolio[i].isVisible=!1}function setupCapionClass(arrayItems){for(var index=0,captionClass="",i=0;i<arrayItems.length;i++){switch(index){case 0:captionClass="azul";break;case 1:captionClass="turquesa";break;case 2:captionClass="rojo";break;case 3:captionClass="rosa"}arrayItems[i].captionClass=captionClass,index++,index>3&&(index=0)}}var vm=this;vm.portafolio=[],vm.showModal=showModal,vm.selectedPhoto=null,activate()}angular.module("chaiApp.widgets").controller("DevGalleryCtrl",DevGalleryCtrl)}();
!function(){"use strict";function devGallery(dataservice,$timeout,$window){var directive={restrict:"EA",controllerAs:"vm",templateUrl:"js/app/widgets/devGallery/dev-gallery.html",scope:{portfoliotype:"="},controller:"DevGalleryCtrl"};return directive}angular.module("chaiApp.widgets").directive("devGallery",devGallery),devGallery.$inject=["dataservice","$timeout","$window"]}();
!function(){"use strict";function ImgGalleryCtrl($scope,dataservice,$timeout,$window,analyticsservice){function activate(){getPortfolio($scope.portfoliotype).then(function(data){console.log("Activated ImageGallery"),vm.portafolio=data,setupCapionClass(data),bindScrollEvent(data)})}function getPortfolio(portfoliotype){return dataservice.getPortfolio(portfoliotype).then(function(data){return data})}function bindScrollEvent(){if($window.innerHeight>document.body.offsetHeight)hideImages(),showImages(0);else{var isActiveAnimation=!1,portafolioWrapper=$(document.getElementById("photos-portfolio")),pixForStart=100;angular.element($window).bind("scroll",function(){!isActiveAnimation&&$window.innerHeight+window.scrollY>=portafolioWrapper.offset().top+pixForStart&&(isActiveAnimation=!0,hideImages(),showImages(0))})}}function showModal($event,photo){$event.preventDefault(),vm.selectedPhoto=photo,$("#imgModal").modal({}),analyticsservice.trackEvent("show-image","click",photo.title)}function showImages(index){var animTime=index>0?400:0;$timeout(function(){if(index<vm.portafolio.length){var item=vm.portafolio[index];item.isVisible=!0,item.myClass="fadeIn",index++,showImages(index)}},animTime)}function hideImages(){for(var i=0;i<vm.portafolio.length;i++)vm.portafolio[i].isVisible=!1}function setupCapionClass(arrayItems){for(var index=0,captionClass="",i=0;i<arrayItems.length;i++){switch(index){case 0:captionClass="azul";break;case 1:captionClass="turquesa";break;case 2:captionClass="rojo";break;case 3:captionClass="rosa"}arrayItems[i].captionClass=captionClass,index++,index>3&&(index=0)}}var vm=this;vm.portafolio=[],vm.showModal=showModal,vm.selectedPhoto=null,activate()}angular.module("chaiApp.widgets").controller("ImgGalleryCtrl",ImgGalleryCtrl),ImgGalleryCtrl.$inject=["$scope","dataservice","$timeout","$window","analyticsservice"]}();
!function(){"use strict";function imageGallery(dataservice,$timeout,$window){var directive={restrict:"EA",controllerAs:"vm",templateUrl:"js/app/widgets/gallery/img-gallery.html",scope:{portfoliotype:"="},controller:"ImgGalleryCtrl"};return directive}angular.module("chaiApp.widgets").directive("imageGallery",imageGallery)}();
!function(){"use strict";function coImageModal(){var directive={restrict:"EA",controllerAs:"modal",templateUrl:"js/app/widgets/imageModal/image-modal.html",scope:{currentimg:"="},controller:function(){}};return directive}angular.module("chaiApp.widgets").directive("coImageModal",coImageModal)}();
!function(){"use strict";function loadingIndicator($rootScope){var htmlTemplate='<div class="container" ng-if="isRouteLoading"><div class="row"><div class="col-md-12 text-center"><h1 class="loading-indicator">Cargando ... <i class="fa fa-cog fa-spin"></i></h1></div></div></div>',directive={restrict:"EA",template:htmlTemplate,link:function(scope,elem,attrs){scope.isRouteLoading=!1,$rootScope.$on("$routeChangeStart",function(){scope.isRouteLoading=!0}),$rootScope.$on("$routeChangeSuccess",function(){scope.isRouteLoading=!1})}};return directive}angular.module("chaiApp.widgets").directive("loadingIndicator",loadingIndicator),loadingIndicator.$inject=["$rootScope"]}();