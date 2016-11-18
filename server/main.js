import { Meteor } from 'meteor/meteor';
import "./captcha.js";

Meteor.startup(() => {
  // code to run on server at startup
    
	Meteor.publish("getpublicaciones",function(id){
  		return PUBLICACIONES.find({usuario:id});
  	});
	Meteor.publish("getcomentarios",function(idpublicacion){
		return COMENTARIOS.find({idMsj:idpublicacion});
	});

});
