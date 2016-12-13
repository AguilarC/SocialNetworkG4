import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
    	agregarAmigo : function (idA) {
    		var consulta = AMIGOS.find({$and:[{idAmigo:idA},{idUser:Meteor.userId()}]}).fetch();
            var msje;
            //console.log(consulta.length);
            if (consulta.length>0) {
                console.log(" Ya existe");
                msje='Solicitud en proceso';
            }else{
                AMIGOS.insert({idAmigo:idA,idUser:Meteor.userId(),aceptado:false}, function(err,result){
                    if (err) {
                        console.log('no se pudo insertar Sol Amigos'+err);
                        msje="error en la insercion";
                    }else{
                        console.log('Se inserto Sol Amigos');
                        msje="se envio la solicitus";
                    };  
                });
                msje='Se envio la scolicitud';
            };
            return {msj:msje};
    	},
    	aceptarAmigo : function(idUs){
    		var idM = Meteor.userId(); 
            //console.log(idM+"-"+idUs);
            AMIGOS.update({$and:[{idAmigo:idM},{idUser:idUs}]},{$set:{aceptado:true}},function(error,result){
    			if (error){
    				console.log(error);
    			}else{
    				//console.log(result+"res");
                    var consulta = AMIGOS.find({$and:[{idUser:idM},{idAmigo:idUs}]}).fetch();
                    //console.log(consulta.length);
                        if (consulta.length>0) {
                            AMIGOS.update({$and:[{idUser:idM},{idAmigo:idUs}]},{$set:{aceptado:true}});
                            console.log("se actualizo el cuate");
                        }else{
                            AMIGOS.insert({idAmigo:idUs,idUser:idM,aceptado:true});    
                            console.log("se inserto el cuate");				
                        };
                    return {value:true,msj:'y tu ahora son amigos...!'};
    			};
    		});
    	},
        verificarDatos : function(){
            var idUs=DATOS_USUARIO.findOne({_id:this.userId});
            //console.log(idUs);
            if (idUs==undefined) {
                DATOS_USUARIO.insert({_id:this.userId,userInterest:"none",slogan:"none",imageuser:"none",fechaNac:"none",telefono:0,direccion:"none"},function(error,result){
                    if (error){
                        console.log(""+error);
                        
                    }else{
                        console.log('ok insert datos usuario');
                    };
                });
            }else {
                console.log('ya existe Dato de usuario..!');
            }
        },
        insertarMsj : function(msj,dest){
            if(Meteor.userId()){
                MENSAJES.insert({msj:msj,destinatario:dest});
            }
        },
        actualizarDatos : function(datos,u,idI){
            DATOS_USUARIO.update({_id:this.userId},{$set:{telefono:datos.telf,fechaNac:datos.fech, direccion:datos.dir, userInterest:"none", slogan:"none", imageuser:idI}}, function(error,result){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("Datos actualizados...!");
                }
            });
            Meteor.users.update({_id:this.userId},{$set:{username:u.un,profile:{gender:u.gen,userlastnamem:u.unlm,userlastnamep:u.unlp,username:u.un}}}, function(error,result){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("Datos user actualizados...!");
                }
            });

        },
        darLike: function(idP){
            var consulta = LIKES.find({$and:[{idUser:this.userId},{id:idP}]}).fetch();
            var cont = PUBLICACIONES.findOne({_id:idP}).like;
            //console.log(cont);
            var userId = this.userId;
            //console.log(consulta.length);
            if (consulta.length==0) {
                cont+=1;
                LIKES.insert({id:idP,idUser:this.userId});
                PUBLICACIONES.update({_id:idP},{$set:{like:cont}},function(error,result){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("likes actualizados...!");
                }     
                });
            }else console.log('se da like solo una vez ..');
        },
        quitarLike:function(idP){
            var cont = PUBLICACIONES.findOne({_id:idP}).like;
            cont-=1;
            PUBLICACIONES.update({_id:idP},{$set:{like:cont}});
            LIKES.remove({$and:[{id:idP,idUser:this.userId}]},function(error,result){
                if (error){
                    console.log(error)
                }
                else{
                    console.log("like removed...!");
                }     
                });
        },
        insertarPublicaciones:function(o){
            PUBLICACIONES.insert({fecha:o.fecha,usuario:this.userId, texto:o.texto,multimedia:o.multimedia,like:0},function(error,result){
                if (error) {console.log(error)}
                if (result) {console.log('se inserto la publicacion')}
            });
        },
        insertarComentarios:function(obj){
            COMENTARIOS.insert(obj);
        }
    });
});
