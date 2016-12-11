import '../../imports/topbar.css';
Template.topbar.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.topbar.onCreated(function(){
	    NProgress.start();
});


Template.topbar.events({
	
});
Template.topbar.events({
	'keyup #searchUsers': function (e) {
		var nombre = e.target.value;
		//console.log(nombre);
		Meteor.call('buscarUsers', nombre, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
			console.log(result);
			}
		});
	}
});