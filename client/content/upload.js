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
        if (error) {
          alert('Error during upload: ' + error);
        } else {
            idimagen=fileObj._id;
            console.log(idimagen);
            alert('File "' + fileObj.name + '" successfully uploaded');
            Meteor.call('insertarGaleria', idimagen, function (error, result) {
              if (result) {
                alert('Se inserto tb en la galeria');
              }
            });
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

