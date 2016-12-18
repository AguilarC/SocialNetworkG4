idimagen = "none";
var comentarios = new ReactiveVar(false);
idcommentarios1 = "";
Template.principalmuralform.events({
	
	"submit #principalm":function(e){
		e.preventDefault();
		var mensaje= e.target.mensaje.value;
		/*ARTICLE.insert({idPub : publicacionesver. edit: false});*/
		fecha=new Date();
		obj={fecha:fecha, texto:mensaje,multimedia:idimagen};
		Meteor.call('insertarPublicaciones', obj, function (error, result) {
			if (error) {console.log('no jala')}
		});
		e.target.mensaje.value = "";
		idimagen = "none";
	}
});

Template.cargarmensajes.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarPrincipal");
	},
	items(){
		var userId=Meteor.userId();
		var amigos = AMIGOS.find({$and:[{idUser:userId},{aceptado:true}]}).fetch();
		var row=[];
		//console.log(amigos.length);
		if (amigos.length>0) {
				
			for (var i = 0;i<amigos.length; i++) {
				var pubA = PUBLICACIONES.find({usuario:amigos[i].idAmigo}).fetch();
				//console.log(pubA);
				for (var j = 0;j<pubA.length; j++) {
					row.push(pubA[j]);
					//console.log(pubA[j]);
				}
			}
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
	},
	
});

Template.publicacionesver.events({

	"click .comentarbtn":function(e){
		Meteor.subscribe("getcomentarios",this._id);
		e.preventDefault();
		var id = e.target.id;
		$("#"+id+"1").fadeToggle("4000");
	},
	"click .comment":function(e){
		e.preventDefault();
		 var idpu=e.target.id;
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



	"click .removebtn":function(e){
		e.preventDefault();
		var idp =e.target.id;
		Meteor.call("eliminarPublicaciones", idp, function (error, result){
			if(error){
				console.log('no elimina'+error);
			}
		})
		
	},
	"click .eliminar":function(e){
		e.preventDefault();
		 var idpu=e.target.id;
	},



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
	listadecomentarios(){
		return COMENTARIOS.find();
	},
});

Template.comentariospublicaciones.events({
	/*"submit #comentariosform":function(e){
		e.preventDefault();
		var msn= e.target.value
		var idmsn = this._id;
		COMENTARIOS.insert({texto:msn,idPub:idmsn});
		e.target.comentarios.value = "";
	},*/
	'keyup #inputcoment':function(e){
        e.preventDefault();
        var obj = {
        	texto:e.target.value,
        	idPub:this._id
        };
        var x = e.keyCode;
        //if (e.target.value.length>1&&x!=13){
	        console.log(e.target.value.length);
	        if (x==13) {
	            Meteor.call('insertarComentarios', obj);
	            e.target.value="";
	        }
	        //console.log
		//}   
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


