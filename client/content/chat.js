import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './chat.html';
import '../../imports/chat.css';

idAmigoMsj=new ReactiveVar('');

Template.chatLayout.onCreated(function(){
        NProgress.start();
});
Template.chatLayout.onRendered(function(){
       Meteor.call('verificarDatos');
       NProgress.done();
        //console.log("chat cargado");

});

Template.users.helpers({
    ready(){
		return FlowRouter.subsReady("loadUsers");
	},
    usersList(){
		return Meteor.users.find({_id:{$ne:Meteor.userId()}});
	},
});
Template.solicitudes.onRendered(function(){
    
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
        return AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]}).fetch();
    },
    
});
Template.mensajes.helpers({
    ReadyMsj(){
        return FlowRouter.subsReady("loadMsj");
    },
    msjList(){
        var idAm = idAmigoMsj.get();
        var idYo = Meteor.userId();
        //console.log(idAm);
        return MENSAJES.find({$or:[{$and:[{remitente:idYo},{destinatario:idAm}]},{$and:[{destinatario:idYo},{remitente:idAm}]}]}).fetch().reverse();
    },
    isRemitente(){
        var idRem = this.remitente;
        //console.log(this);
        if (idRem==Meteor.userId()) {
            return true;
        }
    }
});
Template.usersItems.events({
    'click .solAmistad': function(e){
        e.preventDefault();
        //userId.set(e.target.);
        var idUser= e.target.id;
        //console.log(AMIGOS.find({$and:[{idUser:Meteor.userId()},{aceptado:true}]}).fetch());
        //console.log(idUser);
        Meteor.call('agregarAmigo', idUser, function(error,result){
            if (error) {
                alert(error.msj);
            }
            if (result) {
                alert(result.msj);
            }
            
        });
        //alert("Se envio la solicitud");
    }
});

Template.chatLayout.events({
    'click .idAmigo': function(event){
        idAmigoMsj.set(event.target.id);
        //console.log(idAmigoMsj);
        $('#prev').fadeOut('slow', function() {
            $('#mensajes').fadeIn("3000");
        });
        $('#nombrea').text(this.userA.user.username);
        //console.log(nombre);
                
    },
    'submit #formMsj' : function(e){
        e.preventDefault();
        var texto = e.target.text.value;
        //var idDest = this.userA._id;
        var idDest = idAmigoMsj.get();
        //console.log(idDest);
        Meteor.call('insertarMsj', texto,idDest);
        e.target.text.value="";

    }
});

Template.itemSol.events({
    'click .aceptarSol':function(e){
        e.preventDefault();
        var idUs=e.target.id;
        //console.log(idUs);
        Meteor.call('aceptarAmigo',idUs,function (error,result){
            if(result){
                console.log(result.msj);
            }
        });
    }
});


//una buena logica jquery x si acaso
/*$('span').each(function(){
            if($(this).attr("identify")==Meteor.userId()){
                $(this).css("background-color","#000000");    
            }
            
        });*/