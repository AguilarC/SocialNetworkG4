import '../../imports/perfil.css';
idAmigo ="none";
Template.perfil.onRendered(function(){
        NProgress.done();
        //console.log("perfil cargaso");
    
});
Template.perfil.onCreated(function(){
	    NProgress.start();
});
Template.perfil.helpers({
	isReady() {
		return FlowRouter.subsReady("loadDatos");
	},
	recDatos(){
		return DATOS_USUARIO.find({_id:Accounts.userId()});
	},
	image(){
		if (this.imagen!=undefined) { 
			//console.log(this.image.link);
			return true;
		}
	}
});
Template.verAmigos.events({
	/*'click #amigos': function () {
		console.log(this);
	},*/
	'click .friend': function () {
		//console.log(this.idAmigo);
		idAmigo = this.idAmigo;
		FlowRouter.go('/perfilamigo');
	},
});
Template.verAmigos.helpers({
	isReady() {
		return FlowRouter.subsReady("loadAmigos");
	},
	recAmigos(){
		//console.log(AMIGOS.find({$and:[{idUser:Accounts.userId()},{aceptado:true}]}).fetch());
		return AMIGOS.find({$and:[{idUser:Accounts.userId()},{aceptado:true}]});
	},
	imageAmigo(){
		if (this.userA.imagen!=undefined) { 
			//console.log(this.image.link);
			return true;
		}
	}
});
Template.verGrupos.helpers({
	ready() {
		return FlowRouter.subsReady("loadGrupos");
	},
	recGrupos() {
		var rowGrupo=[];
		var users =GRUPOUSERS.find({idUsuario:Meteor.userId()}).fetch();
		if (users.length>0) {
    		for (var i = 0;i<users.length; i++) {
				//if (true) {}
				var pubG = GRUPOS.find({_id:users[i].idGrupo}).fetch();
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



