import {Mongo} from "meteor/mongo";

DATOS_USUARIO = new  Mongo.Collection('datos_usuario');
MENSAJES = new Mongo.Collection('mensajes');
PUBLICACIONES  = new Mongo.Collection('publicaciones',{
    transform: function(item){
        _.extend(item,{media:Images.findOne({_id:item.multimedia})});
        return item;
    }
});
COMENTARIOS = new Mongo.Collection('comentarios');
GRUPOS = new Mongo.Collection('grupos');
AMIGOS = new Mongo.Collection('amigos');


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
            return this.userId();
        }
    },
    destinatario : {
        type : String
    }
});
MENSAJES.attachSchema(mensajesSchema);
var publicacionesSchema = new SimpleSchema({
    texto : {
        type:String
    },
    multimedia : {
        type:String,
        
    },
    fecha : {
        type:Date,
        autoValue:function(){
            return new Date();
        }
    },
    usuario : {
        type:String,
        autoValue:function(){
            return this.userId
        }
    },
    /*like : {
        type : Number,
    }*/ 
});

PUBLICACIONES.attachSchema(publicacionesSchema);

PUBLICACIONES.allow({
    insert:function(userId,params){
        return !!userId;
    }
});
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
            return this.userId;
        }
    },
    idPub : {
        type : String
    }
});

COMENTARIOS.attachSchema(comentariosSchema);

COMENTARIOS.allow({
    insert:function(userId,params){
        return !!userId;
    }
});

var gruposSchema = new SimpleSchema({
    nombreGrupo : {
        type : String
    },
    idUsuario : {
        type : String,
        autoValue : function(){
            return this.userId();
        }
    },
    nivel : {
        type : String
    }
});
GRUPOS.attachSchema(gruposSchema);
var amigosSchema = new SimpleSchema({
    idUsuario : {
        type : String,
        autoValue : function(){
            return this.userId();
        }
    },
    idAmigo : {
        type : String
    }
});
AMIGOS.attachSchema(amigosSchema);
/*OSTRIO  FILES */

Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg|mp4/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
}