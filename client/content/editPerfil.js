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
		return Meteor.users.find();
	},
	recemail(){
		return Meteor.users.findOne({_id:Meteor.userId()}).emails[0];
	}
});
Template.editPerfil.events({
	'change #regdate': function (e) {
		e.preventDefault();
		fecha = e.target.value;
		f = new Date(fecha + "GMT-04:00");	
	},
	'submit #datossave': function (e) {
		e.preventDefault();
		alert("okk")
		var telefono = e.target.regtelefono.value;
		var date = e.target.regdate.value;
		var direccion = e.target.regdireccion.value;
		Meteor.call("insertardatos",telefono,date,direccion);
	}

});