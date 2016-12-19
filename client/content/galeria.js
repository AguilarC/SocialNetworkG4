import { Template} from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../imports/perfil.css';
Template.galeria.helpers({
	isReady() {
		return FlowRouter.subsReady("loadGaleria");

	},
	imageGaleria(){
		return GALERIA.find({});
	},
});