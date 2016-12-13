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
		if (this.image!=undefined) { 
			console.log(this.image.link);
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
	}
	
});