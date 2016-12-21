import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
    
    Meteor.publish("getUsers",function(){
		return Meteor.users.find({});
	  });
    Meteor.publish("getSolicitudes",function(){
		return AMIGOS.find({idAmigo:this.userId});
	  });
    Meteor.publish("getAmigos", function () {
    	return AMIGOS.find({idUser:this.userId});
    });
    Meteor.publish('getMsj', function () {        
        return MENSAJES.find({$or:[{remitente:this.userId},{destinatario:this.userId}]},{sort:{$natural:1}});
    });
    Meteor.publish("getDatos",function(){
        return DATOS_USUARIO.find({/*_id:this.userId*/});
    });
    Meteor.publish("getLikes",function(){
        return LIKES.find({idUser:this.userId});
    });
    Meteor.publish("getPublicaciones",function(){
        return PUBLICACIONES.find({});
    });
    Meteor.publish("getComentarios",function(){
        return COMENTARIOS.find();
    });
    Meteor.publish("getGrupos",function(){
        return GRUPOS.find();
    });
    Meteor.publish("getGrupoUsers",function(){
        return GRUPOUSERS.find();
    });
    Meteor.publish("getactualizarcomen",function(){
        return PUBLICACIONES.find();
    });
    Meteor.publish("getGaleria",function(){
        return GALERIA.find({idUser:this.userId});
    });
});
