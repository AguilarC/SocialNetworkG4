Template.editPerfil.onCreated(function(){
        NProgress.start();
});
Template.editPerfil.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});