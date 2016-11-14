import '../../imports/multimedia.css';
Template.multimedia.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.multimedia.onCreated(function(){
	    NProgress.start();
});