idimagen = "none";
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
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
        if (error) {
          //alert('Error during upload: ' + error);
          toastr.error("Error", "El archivo no pudo subirse verifique que sea una imagen o video");
        } else {
            idimagen=fileObj._id;
            console.log(idimagen);
            //alert('File "' + fileObj.name + '" successfully uploaded');
            toastr.success("Correcto", "Sea subido el archivo con exito");
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

