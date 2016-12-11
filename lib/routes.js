import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout} from "meteor/kadira:blaze-layout";
FlowRouter.subscriptions = function(params,queryParams) {
        //var id = params.split("=")[1]
        //console.log(id);
        this.register("loadUsers",Meteor.subscribe("getUsers"));
        this.register("loadSolicitudes",Meteor.subscribe("getSolicitudes"));
        this.register("loadAmigos",Meteor.subscribe("getAmigos"));
        this.register("loadMsj",Meteor.subscribe("getMsj"));
        //publicaciones
        this.register("cargarPrincipal",Meteor.subscribe("getPublicaciones"));
        this.register("cargarComentarios",Meteor.subscribe("getComentarios"));
        this.register("cargarLikes",Meteor.subscribe("getLikes"));

    },  
FlowRouter.route("/", {
    name: 'home',
    action() {

        BlazeLayout.render('mainLayout', {topbar :'topbar',right:'chatLayout',left:'datos',main: 'principalmural',hidden:'carrusel'});

    }
});
FlowRouter.route("/editPerfil", {
    name: 'editPerfil',    
    subscriptions:function(params,queryParams){
        this.register("loadDatos", Meteor.subscribe('getDatos'));
    },
    action() {
        BlazeLayout.render('mainLayout', { main: 'editPerfil',topbar :'topbar',right:'chatLayout',left:'datos'});
    }
});

FlowRouter.route("/chat", {
    name: 'chatLayout',
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',right:'chatLayout',left:'datos' });
        
    }
});
FlowRouter.route("/publicaciones", {
    name: 'publicaciones',
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',right:'chatLayout',left:'datos'});
    }
});


FlowRouter.route("/perfil",{
    name: 'perfil',
    subscriptions:function(params,queryParams){
        this.register("loadDatos", Meteor.subscribe('getDatos'));
    },
    action(){

        BlazeLayout.render('mainLayout', { main: 'perfil',topbar :'topbar',right:'chatLayout',left:'datos'});
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
    action(){
        BlazeLayout.render('mainLayout',{main:'principalmural',topbar:'topbar',left:'datos'});
    }
});

FlowRouter.route("/carrusel", {
    name: 'carrusel',
    action() {
        BlazeLayout.render('mainLayout', {topbar :'topbar',right:'chatLayout',left:'datos'});
    }
});

FlowRouter.route("/perfilamigo",{
    name: 'perfilAmigo',
    subscriptions:function(params,queryParams){
        this.register("loadDatosA", Meteor.subscribe('getDatos'));
    },
    action(){
        BlazeLayout.render('mainLayout',{main:'perfilAmigo',topbar:'topbar',left:'datos'});
    }
});

