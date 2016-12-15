Template.chatLayout.onCreated(function(){
        NProgress.start();
});
Template.chatLayout.onRendered(function(){
       NProgress.done();
});
Template.grupos.events({
	'submit #crearGrupo': function (e) {
		e.preventDefault();
		var nombreG = e.target.nombre.value;
		Meteor.call('crearGrupo', nombreG, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);	
			}
		});
	},
	'click #aceptarSolGrupo': function (e) {
		e.preventDefault();
		var idUser=e.target.value;
		
		var idGrupo=e.target.value;
		Meteor.call('aceptarSolicitudGrupo', idGrupo,idUser, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);	
			}
		});
	}
	
});