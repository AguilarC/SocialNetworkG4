import '../../imports/publicaciones.css';
Template.publicaciones.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.publicaciones.onCreated(function(){
	    NProgress.start();
});