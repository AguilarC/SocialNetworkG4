Template.editPerfil.onCreated(function(){
        NProgress.start();
});
Template.editPerfil.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.editPerfil.helpers({
	isready() {
		return FlowRouter.subsReady("loaddatos");
	},
	recdatos(){
		return DATOS_USUARIO.find({userId:Meteor.userId()});
	},
});
Template.editPerfil.events({
	'submit #datossave': function (e) {
		//e.preventDefault();
		//alert("okk")
		var telefono = e.target.regtelefono.value;
		var date = e.target.regdate.value;
		var direccion = e.target.regdireccion.value;
		//alert(telefono+date+direccion);
		Meteor.call("insertardatos",telefono,date,direccion);
	},
	'click #fileUpload': function () {
		// ...
		Meteor.call('insertarDatos');
	}

});