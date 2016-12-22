import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var checked = new ReactiveVar(false);
import '../../imports/perfil.css';
Template.galeria.helpers({
	isReady() {
		return FlowRouter.subsReady("loadGaleria");
	},
	imageGaleria(){
		return GALERIA.find({});
	},
});
Template.galeria.events({
	'click .check-img': function (e) {
		idimagen=this.idImagen;
		$('.glyphicon-check').each(function() {
			$(this).removeClass('glyphicon-check uncheck-img');
			$(this).addClass('glyphicon-unchecked check-img');
		});
		$('#'+idimagen).removeClass('glyphicon-unchecked check-img');
		$('#'+idimagen).addClass('glyphicon-check uncheck-img');
		//console.log(idimagen);
	},
	'click .uncheck-img': function (e) {
		idimagen='none';
		id=this.idImagen;
		$('#'+id).removeClass('glyphicon-check uncheck-img');
		$('#'+id).addClass('glyphicon-unchecked check-img');
		console.log(idimagen);
	},
	'click .eliminar-img':function(){
		id=this.idImagen;
		idG=this._id;
		if (confirm('Esta seguro de Eliminar la esta imagen')) {
			//alert(id);
			Meteor.call('eliminarImagen', id,idG, function (error, result) {
				if (result) {
					console.log(result);
				}
			});
			//console.log('çç?');
		}
	}
});