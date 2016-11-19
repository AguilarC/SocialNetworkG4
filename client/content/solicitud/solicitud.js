Template.topbar.events({
	'click a#solicitud': function (event,template) {
		event.preventDefault();
		Modal.show('solicitud'); 		
		
	}


});
Modal.allowMultiple=true;

