import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
    	agregarAmigo : function (idA) {
    		// ...
    		AMIGOS.insert({idAmigo:idA,aceptado:false}, function(err,result){
    			if (err) {
    				console.log('no se pudo insertar'+err.errmsg);
    				return	{msj:"error en la insercion ya se envuio",};
    			}else{
    				console.log('Se envio la solicitud');
    				return {msj:"ya se envio la solicitus"};
    			};
    		});
    	},
    	aceptarAmigo : function(idUser){
    		AMIGOS.update({idAmigo:idUser},{$set:{aceptado:true}},function(error,result){
    			if (error){

    				console.log(""+error);
    				
    			}else{
    				console.log(AMIGOS.find().fetch());
    				return {msj:"ya se envio la solicitus"};
    			};
    		});
    	},
        insertarDatos : function(){
            DATOS_USUARIO.insert({userInterest:"lo q sea",slogan:"no me jodan",imageId:"123456789"},function(error,result){
                if (error){

                    console.log(""+error);
                    
                }else{
                    console.log(AMIGOS.find().fetch());
                    return {msj:"ya se envio la solicitus"};
                };
            });
        },
    });
});