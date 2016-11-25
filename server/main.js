import { Meteor } from 'meteor/meteor';
import "./captcha.js";
import "./publish.js";
import "./methods.js";
Meteor.startup(() => {

	Meteor.publish("getpublicaciones",function(){
  		return PUBLICACIONES.find({usuario:this.userId},{sort:{$natural:-1}});
  	});
	Meteor.publish("getcomentarios",function(){
		return COMENTARIOS.find();
	});


});
