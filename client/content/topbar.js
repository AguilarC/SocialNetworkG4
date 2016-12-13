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
    	
		return DATOS_USUARIO.find({username:/.*word.*/},{_id:{$ne:Meteor.userId()}});
	},

});
Template.topbar.events({
	'keyup #searchUsers': function (e) {
		KeySearch.set(e.target.value);
		console.log(KeySearch.get());
		
	}
});