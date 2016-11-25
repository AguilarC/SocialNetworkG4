idimagen = "none";
var comentarios = new ReactiveVar(false);
idcommentarios1 = "";
Template.principalmuralform.events({
	"submit #principalm":function(e){
		e.preventDefault();
		var mensaje= e.target.mensaje.value
		
		PUBLICACIONES.insert({texto:mensaje,multimedia:idimagen});
		e.target.mensaje.value = "";
		idimagen = "none";
	}
});

Template.cargarmensajes.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarprincipal");
	},
	items(){
		return PUBLICACIONES.find().fetch().reverse();
	},
	isImage(){
		var ext = PUBLICACIONES.findOne({_id:this._id}).media.ext;
		var tipo="jpg";
		console.log(ext);
		return true;
		
	}
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
	}
});

Template.publicacionesver.helpers({
	
	
	listadecomentarios(){
		return COMENTARIOS.find();
	}
});

Template.comentariospublicaciones.events({
	"submit #comentariosform":function(e){
		e.preventDefault();
		var msn= e.target.comentarios.value
		var idmsn = this._id;
		COMENTARIOS.insert({texto:msn,idPub:idmsn});
		e.target.comentarios.value = "";
	}
});

Template.comentariospublicaciones.helpers({
	isReady(){
		return FlowRouter.subsReady("cargarcomentarios");
	},
	listadecomentarios(){
		return COMENTARIOS.find({idPub:this._id});
	}	
});


/* OSTRIO JS START*/

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
            idimagen=fileObj._id;
            alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

Template.IMAGESLIST.helpers({
  filesimages(){
    return Images.find();
  }
});

/*OSTRIO JS FINALLITY*/