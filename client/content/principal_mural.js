var comentarios = new ReactiveVar(false);
idpublicaciones = new ReactiveVar("");
Template.principalmuralform.events({
	"submit #principalm":function(e){
		e.preventDefault();
		var mensaje= e.target.mensaje.value
		PUBLICACIONES.insert({texto:mensaje});
		e.target.mensaje.value = ""

	}
});

Template.cargarmensajes.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarprincipal");
	},
	items(){
		return PUBLICACIONES.find();
	}
});

Template.publicacionesver.events({
	"click #comentarbtn":function(e){
		Meteor.subscribe("getcomentarios",this._id);
		e.preventDefault();
		comentarios.set(true);
	},
	"click .comment":function(e){
		e.preventDefault();
		 var idpu=e.target.id;
		console.log(e.target.id);
	}
});
Template.publicacionesver.onCreated({

});
Template.publicacionesver.helpers({
	Ready(){
		return FlowRouter.subsReady("cargarcomentarios");
	},
	mostrarcomentarios(){
		return comentarios.get();
	},
	listadecomentarios(){
		return COMENTARIOS.find();
	}
});

Template.comentariospublicaciones.events({
	"submit #comentariosform":function(e){
		e.preventDefault();
		var msn= e.target.comentarios.value
		var idmsn = this._id;
		COMENTARIOS.insert({texto:msn,idMsj:idmsn});
		e.target.comentarios.value = "";
	}
});

