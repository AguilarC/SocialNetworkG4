import '../../imports/home.css';

Template.homeLayout.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.homeLayout.onCreated(function(){
	    NProgress.start();
});