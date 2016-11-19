import '../../imports/topbar.css';
Template.topbar.onRendered(function(){
    this.autorun(()=>{
        NProgress.done();
    });
});
Template.topbar.onCreated(function(){
	    NProgress.start();
});

