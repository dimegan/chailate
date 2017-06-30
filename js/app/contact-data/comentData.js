(function() {
	'use strict';

	angular.module('chaiApp.contactData').controller('ContactDataCtrl', ContactDataCtrl);

	ContactDataCtrl.$inject = ['dataservice', 'analyticsservice', '$sce'];

	function ContactDataCtrl(dataservice, analyticsservice, $sce){
		var ctrl = this;
		ctrl.contactData = null;
		activate();

		function activate(){
			//Tracking google analytics view
			analyticsservice.trackPageView();
			getContactData();
		}

		function getContactData(){
			return dataservice.getContactData().
				then(function(data) {
					data.forEach(function(info) {
						//trustAsHtml: Convert string to html safe
						info.details[0].value = $sce.trustAsHtml(info.details[0].value);
					});
					ctrl.contactData = data;
					return data;
				});
		}
	}
})();