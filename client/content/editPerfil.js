Template.editPerfil.onCreated(function(){
        NProgress.start();
});
Template.editPerfil.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.editPerfil.events({
	'click #enviar': function () {
		// ...
		Meteor.call('insertarDatos');
	}
});