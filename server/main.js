import { Meteor } from 'meteor/meteor';
import "./captcha.js";

Meteor.startup(() => {
  // code to run on server at startup
    
	Meteor.publish("getpublicaciones",function(){
  		return PUBLICACIONES.find({usuario:this.userId},{sort:{$natural:-1}});
  	});
	Meteor.publish("getcomentarios",function(){
		return COMENTARIOS.find();
	});

});
