import {Mongo} from "meteor/mongo";

DATOS_USUARIO = new Mongo.Collection('datos_usuario');
MENSAJES = new Mongo.Collection('mensajes');
PUBLICACIONES  = new Mongo.Collection('publicaciones');
COMENTARIOS = new Mongo.Collection('comentarios');
GRUPOS = new Mongo.Collection('grupos');
AMIGOS = new Mongo.Collection('amigos');
SOLICITUDES=new Mongo.Collection('solicitudes');
var datos_usuarioSchema =new SimpleSchema({
    userId : {
        type : String,
        autoValue : function(){
            return Meteror.userId();
        }
    },
    userInterest : {
        type:String,
    },
    Slogan : {
        type : String
    },
    imageId : {
        type : String
    }
});
DATOS_USUARIO.attachSchema(datos_usuarioSchema);
var mensajesSchema = new SimpleSchema({
    msj : {
        type : String
    },
    fecha : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    },
    remitente : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    destinatario : {
        type : String
    }
});
MENSAJES.attachSchema(mensajesSchema);
var publicacionesSchema = new SimpleSchema({
    texto : {
        type : String
    },
    multimedia : {
        type : String
    },
    fecha : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    },
    usuario : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    like : {
        type : Number,
    } 
});
PUBLICACIONES.attachSchema(publicacionesSchema);
var comentariosSchema = new SimpleSchema({
    texto : {
        type : String
    },
    fecha : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    },
    usuario : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    idMsj : {
        type : String
    }
});
COMENTARIOS.attachSchema(comentariosSchema);
var gruposSchema = new SimpleSchema({
    nombreGrupo : {
        type : String
    },
    aceptado : {
        type : Boolean
    },
    idUsuario : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    nivel : {
        type : String
    }
});
GRUPOS.attachSchema(gruposSchema);
var amigosSchema = new SimpleSchema({
    _id : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    nombreUsuario :{
        type: String,
        autoValue : function(){
            return  Meteor.user().username+" "+Meteor.user().profile.userlastname;
        }
    },
    idAmigo : {
        type : String
    },
    aceptado : {
        type : Boolean
    }
});
AMIGOS.attachSchema(amigosSchema);
