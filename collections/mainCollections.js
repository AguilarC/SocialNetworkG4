import {Mongo} from "meteor/mongo";


DATOS_USUARIO = new Mongo.Collection('datos_usuario',{
    transform:function(row){
        //row.username="Ditmaros";
        //console.log(user);
        var user = Accounts.users.findOne({_id:row._id})
            row.username = user.profile.username; 
            row.userlastnamep = user.profile.userlastnamep;
            row.userlastnamem = user.profile.userlastnamem;
            row.gender = user.profile.gender;
            row.email = user.emails[0].address;
        
        _.extend(row,{imagen:Images.findOne({_id:row.imageuser})});
        //console.log(row);*/
        return row;
    }
});
LIKES= new Mongo.Collection('likes');
MENSAJES = new Mongo.Collection('mensajes');
PUBLICACIONES  = new Mongo.Collection('publicaciones',{
    transform: function(item){
        _.extend(item,{media:Images.findOne({_id:item.multimedia})},
            {likes:LIKES.find({id:item._id}).fetch()},
            {amigo:Meteor.users.findOne({_id:item.usuario})});
        //console.log(LIKES.find({id:item._id}).fetch());
        return item;
    }
});
COMENTARIOS = new Mongo.Collection('comentarios',{
    transform:function(item){
        _.extend(item,{user:DATOS_USUARIO.findOne({_id:item.usuario})});
        return item;
    }
});
GRUPOS = new Mongo.Collection('grupos');
AMIGOS = new Mongo.Collection('amigos',{
    transform : function(itemA){       
        _.extend(itemA,
            {userA:DATOS_USUARIO.findOne({_id:itemA.idAmigo})},
            {userI:DATOS_USUARIO.findOne({_id:itemA.idUser})});
        return itemA;
    }
});
if (Meteor.isClient) {
  Meteor.subscribe('datos.all');
}

if (Meteor.isServer) {
  Meteor.publish('datos.all', function () {
    return DATOS_USUARIO.find();
  });
}
var likesSchema =new SimpleSchema({
    id:{
        type : String
    },
    idUser:{
        type : String
    }
});
var datos_usuarioSchema =new SimpleSchema({
    _id : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    userInterest : {
        type:String,
    },
    slogan : {
        type : String
    },
    imageuser : {
        type : String
    },
    fechaNac : {
        type : String
    },
    telefono : {
        type : Number
    },
    direccion : {
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
        type:String
    },
    multimedia : {
        type:String,
        
    },
    fecha : {
        type:Date
    },
    usuario : {
        type : String
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
    idUser: {
        type : String
    },
    idAmigo : {
        type : String
    },
    aceptado : {
        type : Boolean
    }
});
AMIGOS.attachSchema(amigosSchema);
/*OSTRIO  FILES */

Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from ge
  storagePath:'/home/hp-450/Seminario/data',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 11485760 && /png|jpg|jpeg|mp4|3gp/i.test(file.extension)) {
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




////
/*if(!!user.profile)
        {
            row.username = user.profile.username;
            row.userlastnamep = user.profile.userlastnamep;
            row.userlastnamem = user.profile.userlastnamem;
            row.gender = user.profile.gender;             
        }
        if(!!user.emails)
        {
            row.email = user.emails[0].address;
        }*/