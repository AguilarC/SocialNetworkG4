import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../imports/datos.css';

Template.datos.onCreated(function(){
        NProgress.start();
        
});
Template.datos.onRendered(function(){
    
        NProgress.done();
    
});
Template.datos.helpers({
	isReady() {
		return FlowRouter.subsReady("loadGrupos");

	},
	verGrupos(){
		return GRUPOS.find({}).fetch();
	}
});

Template.creargrupo.events({
	'submit  #creargrupos':function(e){
		e.preventDefault();
		var idGrupo ='';
		var idUser= Meteor.userId();
		var nombreG = e.target.nombre.value;
		Meteor.call('crearGrupo', nombreG,idUser,idimagen, function (error, result) {
			if (error) {
				alert(error);
			}
			if (result) {
				idGrupos.set(result);
			}
		});
		idimagen='none';
		$('#group').modal('hide');
		
		FlowRouter.go('/grupos');
	}
});
Template.datos.events({
	'click .irgrupo': function (e) {
		e.preventDefault();
		idGrupos.set(e.target.id);
		FlowRouter.go('/grupos');
	}
});