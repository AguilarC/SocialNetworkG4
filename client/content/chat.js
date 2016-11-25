import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './chat.html';
import '../../imports/chat.css';


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
    readyS(){
		return FlowRouter.subsReady("loadSolicitudes");
	},
    solList(){
        return AMIGOS.find({idAmigo:Meteor.userId(),aceptado:false});
    }
});
Template.listAmigos.helpers({
    readyA() {
        return FlowRouter.subsReady("loadAmigos");
    },
    amigosList(){
        return AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]});
    }
});
Template.mensajes.helpers({
    ReadyMsj(){
        return FlowRouter.subsReady("loadMsj");
    },
    msjList(){
        var idAm = this.userA.userId;
        var idYo = Meteor.userId();
        return MENSAJES.find({$or:[{$and:[{remitente:idYo},{destinatario:idAm}]},{$and:[{destinatario:idYo},{remitente:idAm}]}]});
    }
});
Template.usersItems.events({
    'click .solAmistad': function(e){
        e.preventDefault();
        //userId.set(e.target.);
        var idUser= e.target.id;
        //console.log(AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]}).fetch());
        //console.log(idUser);
        Meteor.call('agregarAmigo', idUser);
        //alert("Se envio la solicitud");
    }
});
Template.mensajes.onRendered(function(){
        var id=Meteor.userId();
        $('span').each(function(){
            
            if($(this).attr("identify")==id){
                $(this).css("background-color","#ff0000");    
            }
            
        });
});

Template.chatLayout.events({
    'click .display': function(e){
        var id=event.target.id;
        
        $('#'+id+"1").fadeToggle("3000");
    },
    'submit #formMsj' : function(e){
        e.preventDefault();
        var texto = e.target.text.value;
        var idDest = this.userA.userId;
        //console.log(idDest);
        Meteor.call('insertarMsj', texto,idDest);
        e.target.text.value="";
    },

});
Template.itemSol.events({
    'click .aceptarSol':function(e){
        e.preventDefault();
        var idUs=e.target.id;
        //console.log(idUs);
        Meteor.call('aceptarAmigo',idUs);
    }
});