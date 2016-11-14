import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
    	agregarAmigo : function (idA) {
    		// ...
    		AMIGOS.insert({idAmigo:idA,aceptado:false}, function(err,result){
    			if (err) {
    				console.log('no se pudo insertar'+err);
    				return	false;
    			}else{
    				console.log('Se envio la solicitud');
    				return true;
    			};
    			if (result) {
    				alert('volia');
    			};
    		});
    	},
    	aceptarAmigo : function(idUser){
    		AMIGOS.update({idUsuario:idUser},{$set:{aceptado:true}});
    	}
    });
});