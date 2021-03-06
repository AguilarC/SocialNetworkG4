import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../../imports/principal_mural.css';
idimagen = "none";
notiAmigos = new ReactiveVar([]);
var comentarios = new ReactiveVar(false);
idcommentarios1 = "";
Template.principalmuralform.helpers({
	isImageUser() {
		var userId=Meteor.userId();
		var imagen = DATOS_USUARIO.find({_id:userId}).fetch()[0];
		if (imagen.imageuser!='none') {
			return {value:true,imagen:imagen.imagen};
		}
		
	}
});
Template.principalmuralform.events({
	'click .display-galeria':function(){
		$('#galeria').fadeToggle('slow');
	},
	"submit #principalm":function(e){
		e.preventDefault();
		var mensaje= e.target.mensaje.value;
		var fecha=new Date();
		if (this._id!=undefined) {
			var idGroup=this._id;
			var obj={fecha:fecha, texto:mensaje,multimedia:idimagen,idGroup:idGroup};
			//console.log(obj);
		}else {	
			var obj={fecha:fecha, texto:mensaje,multimedia:idimagen};
		}
		Meteor.call('insertarPublicaciones', obj, function (error, result) {
			if (error) {console.log('error en la llamada')}
			if (result) {
				var idP=result;
				var tipo='publicacion';
				//console.log(idP+tipo);
				Meteor.call('insertarNotificaciones', tipo,idP, function (error, result) {
					if (error) {console.log('error en la llamada')}
				});
			}
		});	
		e.target.mensaje.value = "";
		idimagen = "none";
		$('#galeria').fadeOut('slow');
	}

});

Template.cargarpublicaciones.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarPrincipal");
	},
	items(){
		var userId=Meteor.userId();
		var amigos = AMIGOS.find({$and:[{idUser:userId},{aceptado:true}],usuario:{$ne:userId}}).fetch();
		var row=[];
		var rowa=[];
		//console.log(amigos.length);
		if (amigos.length>0) {
				
			for (var i = 0;i<amigos.length; i++) {
				var pubA = PUBLICACIONES.find({usuario:amigos[i].idAmigo}).fetch();
				//console.log(pubA);
				for (var j = 0;j<pubA.length; j++) {
					row.push(pubA[j]);
					rowa.push(pubA[j]);
					//console.log(pubA[j]);
				}
			}
			notiAmigos.set(rowa.reverse());
			//console.log(row.reverse());
		}
		var pubY = PUBLICACIONES.find({usuario:Meteor.userId()}).fetch()
		for (var k = 0;k<pubY.length; k++) {
				row.push(pubY[k]);
			}
		row.sort(function(a, b){
			if (a.fecha>b.fecha) {
				return 1;
			}
			if (a.fecha<b.fecha) {
				return -1;
			}
			return 0;
		});
		return row.reverse();
	}
});
Template.cargarpublicacionesg.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarPrincipal");
	},
	pubGroup(){
		var idG= this._id;
		//console.log(PUBLICACIONES.find({idGroup:idG}).fetch());
		return	PUBLICACIONES.find({idGroup:idG}).fetch().reverse();
	}

});

Template.publicacionesver.events({
	
	"click .comentarbtn":function(e){
		Meteor.subscribe("getcomentarios",this._id);
		e.preventDefault();
		var id = e.target.id;
		$("#"+id+"1").fadeToggle("4000");
	},

	"click #imagen":function(e){
		e.preventDefault();
		console.log(PUBLICACIONES.findOne({_id:this._id}).media.ext);
	},
	'click .meGusta' : function(e){
		var idPub = e.target.id;
		//console.log(idPub);
		Meteor.call('darLike', idPub, function (error, result) {
			if (error) {
				console.log('no jala'+error);
			}
		});
	},
	'click .noMeGusta' : function(e){
		var idPub = e.target.id;
		//console.log(idPub);
		Meteor.call('quitarLike', idPub, function (error, result) {
			if (error) {
				console.log('no jala'+error);
			}
		});
	},
	'click .display-compartir' : function(e){
		var id = e.target.id;
		//console.log(idPub);
		$('#11'+id).fadeToggle();
	},

	"click .removebtn":function(e){
		e.preventDefault()
		var idp =e.target.id;
		Meteor.call("eliminarPublicaciones", idp, function (error, result){
			if(error){
				console.log('no elimina'+error);
			}
		})
		
	},
	
	"click .editbtn":function(e){
		e.preventDefault();
		Meteor.subscribe("getactualizarcomen",this._id);
		var idP=e.target.id;
		console.log(idP);
		$("#1"+idP).fadeToggle("4000");
			//$("#actualizar").css("display", "block");
		
	},
	"submit .actualizar":function(e){
		e.preventDefault();
		
		var textA = e.target.msn.value;
		var idP= this._id;
		Meteor.call("actualizarPublicaciones",idP,textA, function(error,result){
			if(error){
				console.log(error);
			}
		})
		//console.log(idP);
		$('.actualizar').fadeOut('4000');

	}

});

Template.publicacionesver.helpers({
	isImage(){
		if (this.media!=undefined) {
			var ext = this.media.ext;
			var tipo="jpg";
			//console.log(this.media.ext);
			if (ext=='jpg'||ext=='png'||ext=='jpeg') {
				return true;
			};
		}else return false;
	},
	isVideo(){
		if (this.media!=undefined) {
			var ext = this.media.ext;
			var tipo="3gp";
			//console.log(this.media.ext);
			if (ext=='3gp'||ext=='mp4'||ext=='avi') {
			return true;
			};
		}else return false;
	},
	isLiked(){
		var like = LIKES.find({$and:[{idUser:Meteor.userId()},{id:this._id}]}).fetch();
		//console.log(like.length);
		if (like.length==0) {
			return true;
		}
	},
	userPubGroup(){
		if (this.idGroup!=undefined) {
		return true;
		}
	},
	listadecomentarios(){
		return COMENTARIOS.find();
	},
	shwoweditremove(){
		return PUBLICACIONES.find({$and:[{usuario:Meteor.userId()},{_id:this._id}]}).fetch();
		
	}
	
});

Template.comentariospublicaciones.events({
	'keyup #inputcoment':function(e){
        e.preventDefault();
        var obj = {
        	texto:e.target.value,
        	idPub:this._id
        };
        
        var x = e.keyCode;
	        if (x==13) {
	            Meteor.call('insertarComentarios', obj);
				e.target.value="";
			}
    }

});

Template.comentariospublicaciones.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarComentarios");
	},
	listadecomentarios(){
		return COMENTARIOS.find({idPub:this._id});
	}	
});


