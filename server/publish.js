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
    Meteor.publish("getdatos",function(){
        //console.log(Meteor.users.find({_id:this.userId}).fetch());
        return DATOS_USUARIO.find({userId:this.userId});
    });
});
