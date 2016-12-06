import '../../imports/carrusel.css';


Template.carrusel.onCreated(function(){
        NProgress.start();
});
Template.carrusel.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});