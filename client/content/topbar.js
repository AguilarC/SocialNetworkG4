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

});
Template.topbar.events({
	'keyup #searchUsers': function (e) {
		KeySearch.set(e.target.value);
		var word=xDnwDoBAgAFchHqPW;
		var pal = /.*/+word+/.*/;
		console.log(DATOS_USUARIO.find({_id:pal}).fetch());
		
	}
});