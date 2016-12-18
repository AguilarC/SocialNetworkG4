import '../../imports/grupos.css';

Template.chatLayout.onCreated(function(){
        NProgress.start();
});
Template.chatLayout.onRendered(function(){
       NProgress.done();
});
Template.grupos.helpers({
	isReady() {
		return FlowRouter.subsReady("loadGrupos");

	},
	verGrupo(){
		return GRUPOS.find({_id:idGrupos.get()}).fetch();
	},
	isUserGroup(){
		var id=Meteor.userId();
		var users=this.users;
		var con=0;
		for (var i = 0; i < users.length; i++) {
			if (users[i].idUsuario==id) {
				con++;
			}
		}
		if (con!=0) {
			return true;
		}else console.log(this);
	},
	

});
Template.solGrupo.helpers({
	listSolGroup(){
		var idG=this._id;
		//console.log(idG);
		return GRUPOUSERS.find({$and:[{idGrupo:idG},{aceptado:false}]}).fetch();
	}
});
Template.grupos.events({
	
	'click #aceptarSolGrupo': function (e) {
		e.preventDefault();
		var idUser=e.target.value;
		
		var idGrup=e.target.value;
		Meteor.call('aceptarSolicitudGrupo', idGrup,idUser, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);	
			}
		});
	},
	'click .solunirg': function (e) {
		e.preventDefault();
		var idGrup=e.target.id;
		Meteor.call('solicitarUnirseGrupo', idGrup, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);	
			}
		});
	}

	
});