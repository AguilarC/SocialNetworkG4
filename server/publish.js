import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
    Meteor.publish("getUsers",function(idu){
		return Meteor.users.find({});
	  });
    Meteor.publish("getSolicitudes",function(id){
		return AMIGOS.find({$and:[{idAmigo:id},{aceptado:true}]});
	  });
    Meteor.publish("getAmigos", function (idA) {
    	return AMIGOS.find({$and:[{idAmigo:idA},{aceptado:false}]});
    });
});