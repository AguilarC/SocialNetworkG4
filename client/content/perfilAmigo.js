import	{Meteor} from 'meteor/meteor';

Template.perfilAmigo.onCreated(function(){
        NProgress.start();
    	//Meteor.call('verificarDatos');
    	//console.log(idAmigo);

});
Template.perfilAmigo.onRendered(function(){
        NProgress.done();
});
Template.perfilAmigo.helpers({
	isReady() {
		return FlowRouter.subsReady("loadDatosA");
	},
	recDatos(){
		//console.log(DATOS_USUARIO.find({_id:idAmigo}).fetch());
		return DATOS_USUARIO.find({_id:idAmigo});
	},
	image(){
		if (this.imagen!=undefined) { 
			//console.log(this.image.link);
			return true;
		}
	}
});