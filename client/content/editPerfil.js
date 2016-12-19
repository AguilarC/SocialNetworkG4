
Template.editPerfil.onCreated(function(){
        NProgress.start();
    	//Meteor.call('verificarDatos');

});
Template.editPerfil.onRendered(function(){
        NProgress.done();
        //console.log("edit perfil cargado");
});
Template.editPerfil.helpers({
	isready() {
		return FlowRouter.subsReady("loadDatos");
	},
	recdatos(){
		return DATOS_USUARIO.find({_id:Accounts.userId()});
	},
	image(){
		if (this.imagen!=undefined) { 
			//console.log(this.image.link);
			return true;
		}
	}
});
Template.editPerfil.events({
	'submit #datossave': function (e) {
		e.preventDefault();
		//alert("okk")
		var telefono = e.target.regtelefono.value;
		var date = e.target.regdate.value;
		var direccion = e.target.regdireccion.value;	
		var gen = e.target.regsexo.value;
		var un = e.target.regnombre.value;
		var unlp = e.target.regappaterno.value;
		var unlm = e.target.regapmaterno.value;
		var datos={telf:telefono,fech:date,dir:direccion};
		var user={gen:gen,un:un,unlp:unlp,unlm:unlm};
		
		var idImage = e.target.regimage.id;
		if(idimagen!="none"){
			idImage=idimagen;
		}
		console.log(idimagen);
		Meteor.call("actualizarDatos",datos,user,idImage);
		}
});