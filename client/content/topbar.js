import '../../imports/topbar.css';
import { ReactiveVar } from 'meteor/reactive-var';
var KeySearch = new ReactiveVar();
rowGrupo=[];
Template.topbar.onRendered(function(){
    NProgress.done();
});
Template.topbar.onCreated(function(){
	NProgress.start();
});
Template.topbar.helpers({
	ready(){
		return FlowRouter.subsReady("loadUsers");
	},
    usersList(){
    	var word=KeySearch.get();

		return DATOS_USUARIO.find({_id:/.*word.*/},{_id:{$ne:Meteor.userId()}});
	},
	/*readyP(){
		return FlowRouter.subsReady("cargarPrincipal");

	},*/
	contSol(){
        return {cont:AMIGOS.find({idAmigo:Meteor.userId(),aceptado:false/*,visto:false*/}).count()};
    },
    contNot(){
        return {cont:notiAmigos.get().length};
    },
});
Template.publicacionAmigos.helpers({
	
    listPubAmigos(){
    	//console.log(notiAmigos.get());
    	return notiAmigos.get();
    },
    listPubGrupos(){
    	idUser =Meteor.userId();
    	
    	var users = GRUPOUSERS.find({idUsuario:idUser}).fetch();
    	//console.log(users);
    	if (users.length>0) {
    		for (var i = 0;i<users.length; i++) {
				//if (true) {}
				var pubG = PUBLICACIONES.find({idGroup:users[i].idGrupo}).fetch();
				//console.log(pubG);
				for (var j = 0;j<pubG.length; j++) {
					rowGrupo.push(pubG[j]);
					//console.log(pubA[j]);
				}
			}

    	}else {console.log(users.length)}
    	return rowGrupo.reverse();
    }

});
Template.topbar.events({
	'keyup #searchUsers': function (e) {
		KeySearch.set(e.target.value);
		/*var word='xDnwDoBAgAFchHqPW';
		var pal = word;
		alert(pal);
		console.log(DATOS_USUARIO.find({_id:pal}).fetch());*/
		
	},
	'click .display-sol': function () {
		
		$('#solicitudes').fadeToggle("3000");
	},
	'click .closesol': function () {
		
		$('#solicitudes').fadeOut("3000");
	},
	'click .display-not': function () {
		
		$('#notificaciones').fadeToggle("3000");
	},
	'click .closenot': function () {
		
		$('#notificaciones').fadeOut("3000");
	},
});