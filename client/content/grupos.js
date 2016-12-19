import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../imports/grupos.css';
var solreturn = new ReactiveVar(false);
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
			if (users[i].idUsuario==id&&users[i].aceptado==true) {
				con++;
			}
		}
		if (con!=0) {
			return true;
		}//else console.log(this);
	},
	solExist(){
		var id=Meteor.userId();
		var users=GRUPOS.find({_id:this._id}).fetch()[0].users;
		for (var i = 0; i < users.length; i++) {
			if (users[i].idUsuario==id&&users[i].aceptado==false) {
				solreturn.set(true);
			}
		}
		return solreturn.get();
	},
	isAdmin(){
		
	}

});
Template.solGrupo.helpers({
	listSolGroup(){
		var idG=this._id;
		//console.log(idG);
		return GRUPOUSERS.find({$and:[{idGrupo:idG},{aceptado:false}]}).fetch();
	}
});
Template.listUsersGroup.helpers({
	listUsersG() {
		var idG=this._id;
		//console.log(this);
		return GRUPOUSERS.find({$and:[{idGrupo:idG},{aceptado:true}]}).fetch();
	}
});
Template.grupos.events({
	
	'click .aceptarsolg': function (e) {
		//e.preventDefault();
		var idUser=this.idUsuario;
		//console.log(idUser);
		var idGrup= this.idGrupo;
		Meteor.call('aceptarSolicitudGrupo', idGrup,idUser, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);
				//alert(se Acepto la solicitud);	
			}
		});
	},
	'click .solunirg': function (e) {
		//e.preventDefault();
		var idGrup=e.target.id;
		Meteor.call('solicitarUnirseGrupo', idGrup, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);
				solreturn.set(true);	
			}
		});
	},
	'click .cansolunirg': function (e) {
		//e.preventDefault();
		var idGrup=e.target.id;
		//alert('cancelarsolicitudGrupo');
		Meteor.call('cancelarsolicitudGrupo', idGrup, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				console.log(result);
				solreturn.set(false);
			}
		});
	}
	
});