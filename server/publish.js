import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
    
    //su vista se controlara desde chat.js
    Meteor.publish("getSolicitudes",function(){
		return AMIGOS.find({idAmigo:this.userId});
	  });
    Meteor.publish("getAmigos", function () {
    	return AMIGOS.find({idUser:this.userId});
    });
    Meteor.publish('getMsj', function () {        
        return MENSAJES.find({$or:[{remitente:this.userId},{destinatario:this.userId}]},{sort:{$natural:1}});
    });
    //Su vista es universal
    Meteor.publish("getUsers",function(){
        return Meteor.users.find({/*_id:this.userId*/});
    });
    Meteor.publish("getDatos",function(){
        return DATOS_USUARIO.find({/*_id:this.userId*/});
    });
    //Su vista se controlara desde principal_mural.js
    Meteor.publish("getPublicaciones",function(){
        return PUBLICACIONES.find({});
    });
    Meteor.publish("getLikes",function(){
        return LIKES.find({idUser:this.userId});
    });
    Meteor.publish("getComentarios",function(){
        return COMENTARIOS.find();
    });
    Meteor.publish("getactualizarcomen",function(){

        return PUBLICACIONES.find();
    });
    //Su vista se controlara desde grupos.js
    Meteor.publish("getGrupos",function(){
        return GRUPOS.find();
    });
    Meteor.publish("getGrupoUsers",function(){
        return GRUPOUSERS.find();
    });
    //Su vista se controlara desde galeria.js
    Meteor.publish("getGaleria",function(){
        return GALERIA.find({idUser:this.userId});
    });
    //Su vista se controlara desde topbar.js
    Meteor.publish("getNotificaciones",function(){
        
        return NOTIFICACIONES.find({});
    });
});
