import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
    	agregarAmigo : function (idA) {
    		var consulta = AMIGOS.find({$and:[{idAmigo:idA},{idUser:Meteor.userId()}]}).fetch();
            console.log(consulta.length);
            if (consulta.length>0) {
                console.log(" Ya existe");
                return false;
            }else{
                AMIGOS.insert({idAmigo:idA,idUser:Meteor.userId(),aceptado:false}, function(err,result){
                    if (err) {
                        console.log('no se pudo insertar'+err);
                        return  {msj:"error en la insercion"};
                    }else{
                        
                        console.log('Se inserto');
                        return {msj:"ya se envio la solicitus"};
                    };
                });
                return true;
            };
    		
    	},
    	aceptarAmigo : function(idUs){
    		var idM = Meteor.userId(); 
            console.log(idM+"-"+idUs);
            AMIGOS.update({$and:[{idAmigo:idM},{idUser:idUs}]},{$set:{aceptado:true}},function(error,result){
    			if (error){
    				console.log(error);
    			}else{
    				console.log(result+"res");
                    var consulta = AMIGOS.find({$and:[{idUser:idM},{idAmigo:idUs}]}).fetch();
                    console.log(consulta.length);
                    if (consulta.length>0) {
                        AMIGOS.update({$and:[{idUser:M},{idAmigo:idUs}]},{$set:{aceptado:true}});
                        console.log("se actualizo el cuate");
                    }else{
                         AMIGOS.insert({idAmigo:idUs,idUser:idM,aceptado:true});    
                         console.log("se inserto el cuate");				
                    };
                    return {msj:"ya se envio la solicitus"};
    			};
    		});
    	},
        insertarDatos : function(){
            DATOS_USUARIO.insert({userInterest:"lo q sea",slogan:"no me jodan",imageId:"123456789",fechaNac:"2015-11-15",telefono:1234566,direccion:"Donde sea"},function(error,result){
                if (error){

                    console.log(""+error);
                    
                }else{
                    console.log('ok insert');
                    return {msj:"ya se envio la solicitus"};
                };
            });
        },
        insertarMsj : function(msj,dest){
            if(Meteor.userId()){
                MENSAJES.insert({msj:msj,destinatario:dest});
            }
        },
        insertardatos : function(tel,fech,dir){
            DATOS_USUARIO.update({userId:this.userId},{$set:{telefono:tel,fechaNac:fech, direccion:dir, userInterest:"none", slogan:"none", imageId:"none"}}, function(error,result){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("ok")
                }
            });
        }
    });
});