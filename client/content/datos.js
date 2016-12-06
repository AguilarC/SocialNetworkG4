import '../../imports/datos.css';


Template.datos.onCreated(function(){
        NProgress.start();
});
Template.datos.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
