import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout} from "meteor/kadira:blaze-layout";
FlowRouter.subscriptions = function(params,queryParams) {
        //var id = params.split("=")[1]
        //console.log(id);
        this.register("loadUsers",Meteor.subscribe("getUsers"));
        this.register("loadSolicitudes",Meteor.subscribe("getSolicitudes"));
        this.register("loadAmigos",Meteor.subscribe("getAmigos"));
        this.register("loadMsj",Meteor.subscribe("getMsj"));
        
    },  
FlowRouter.route("/", {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', { main:'publicaciones',topbar :'topbar',right:'chatLayout',left:'datos'});
    }
});
FlowRouter.route("/editPerfil", {
    name: 'editPerfil',    
    subscriptions:function(params,queryParams){
        this.register("loaddatos", Meteor.subscribe('getdatos'));
    },
    action() {
        BlazeLayout.render('mainLayout', { main: 'editPerfil',topbar :'topbar',right:'chatLayout'});
    }
});

FlowRouter.route("/chat", {
    name: 'chatLayout',
    subscriptions:function(params, queryParams)
    {
        
        
    },
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',right:'chatLayout' });
        
    }
});
FlowRouter.route("/publicaciones", {
    name: 'publicaciones',
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',right:'chatLayout'});
    }
});


FlowRouter.route("/perfil",{
    name: 'perfil',
    action(){

        BlazeLayout.render('mainLayout', { main: 'perfil',topbar :'topbar',right:'chatLayout'});
    }

});

FlowRouter.route("/datos", {
    name: 'datos',
    action() {
        BlazeLayout.render('mainLayout', {main: '',topbar :'topbar',left:'datos'});


    }
});
 

FlowRouter.route("/multimedia", {
    name: 'multimedia',
    action() {
        BlazeLayout.render('mainLayout', { main: 'multimedia',topbar :'topbar',right:''});
    }
}); 


FlowRouter.route("/captcha", {
    name: 'captcha',
    action() {
        BlazeLayout.render('mainLayout', { main: 'captchaLayout',topbar :'topbar',right:'chatLayout'});
    }
});


FlowRouter.route("/principalmural",{
    name: 'principalmural',
    subscriptions: function(params, queryParams){
        this.register("cargarprincipal",Meteor.subscribe("getpublicaciones"));
        this.register("cargarcomentarios",Meteor.subscribe("getcomentarios"));
    },
    action(){
        BlazeLayout.render('mainLayout',{main:'principalmural',topbar:'topbar'});
    }
});