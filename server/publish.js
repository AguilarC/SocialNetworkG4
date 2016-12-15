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
    Meteor.publish("getDatos",function(){
        return DATOS_USUARIO.find({/*_id:this.userId*/});
    });
    Meteor.publish("getLikes",function(){
        return LIKES.find({idUser:this.userId});
    });
    Meteor.publish("getPublicaciones",function(){
        return PUBLICACIONES.find({});
    });
    Meteor.publish("getComentarios",function(){
        return COMENTARIOS.find();
    });
    Meteor.publish("getGrupos",function(){
        return GRUPOS.find();
    });
    Meteor.publish("getGrupoUsers",function(){
        return GRUPOUSERS.find();
    });
    /*Meteor.publish("getPublicaciones",function(){
        var hayAm = AMIGOS.find({$and:[{idUser:this.userId},{aceptado:true}]}).fetch();
        console.log(hayAm.length);
        if (hayAm.length>0) {
            var amigosp = AMIGOS.find({idUser:this.userId}).fetch();
            var rows = [];
            console.log(amigosp);
            for (var i = 0;i<amigosp.length; i++) {
                var pubAm = PUBLICACIONES.find({usuario:amigosp[i].idAmigo});
                //for (var j = 0;j<pubAm.length; j++) {
                    
                    //array.push(amigosp[i].idAmigo);
                    rows.push(pubAm);
                    console.log(pubAm);
                    
                    //cadena+=",{idAmigo:"+amigosp[i].idAmigo+"}";
                //}
            }
            var yo =PUBLICACIONES.find({usuario:this.userId});
            return rows;
        }else{
            return PUBLICACIONES.find({usuario:this.userId});
        }
    });*/
});
