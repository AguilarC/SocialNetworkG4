import '../../imports/perfil.css';
Template.perfil.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.perfil.onCreated(function(){
	    NProgress.start();
});