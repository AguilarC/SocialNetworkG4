import '../../imports/topbar.css';
import { ReactiveVar } from 'meteor/reactive-var';
var KeySearch = new ReactiveVar();
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
	contSol(){
        return {cont:AMIGOS.find({idAmigo:Meteor.userId(),aceptado:false/*,visto:false*/}).count()};
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

});