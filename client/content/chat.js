import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './chat.html';
import '../../imports/chat.css';
//var userId = new ReactiveVar("");
Template.chatLayout.onCreated(function(){
        NProgress.start();
});
Template.chatLayout.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});

Template.users.helpers({
    ready(){
		return FlowRouter.subsReady("loadUsers");
	},
    usersList(){
		return Meteor.users.find({_id:{$ne:Meteor.userId()}});
	},
});
Template.solicitudes.helpers({
    solList(){
        return AMIGOS.find({});
    },
    readyS(){
		return FlowRouter.subsReady("loadSolicitudes");
	}
});
Template.listAmigos.helpers({
    readyA() {
        return FlowRouter.subsReady("loadAmigos");
    },
    amigosList(){
        return AMIGOS.find({$and:[{_id:Meteor.userId()},{aceptado:true}]});
    }
});
Template.usersItems.events({
    'click .solAmistad': function(e){
        e.preventDefault();
        //userId.set(e.target.);
        var idUser= e.target.id;
        console.log(idUser);
        Meteor.call('agregarAmigo', idUser);
        //alert("Se envio la solicitud");
    }
});

Template.chatLayout.events({
    'click .display': function(e){
        e.preventDefault();
        var id=event.target.id;
        $('#'+id+id).toggle("slow");
        //console.log(""+id);

    },
});

Template.itemSol.events({
    'click .aceptarSol':function(e){
        var idUs=e.target.id;
        //console.log(idUs);
        Meteor.call('aceptarAmigo',idUs);
    }
});