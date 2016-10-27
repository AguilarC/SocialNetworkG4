import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout} from "meteor/kadira:blaze-layout";


FlowRouter.route("/", {
    name: 'home',
    action() {
        BlazeLayout.render('mainHome', { main: 'homeLayout',topbar :'topbar'});
    }
});
FlowRouter.route("/perfil", {
    name: 'perfil',
    action() {
        BlazeLayout.render('mainLayout', { main: 'perfil',topbar :'topbar',right:'chatLayout'});
    }
});

FlowRouter.route("/chat", {
    name: 'chatLayout',
    action() {
        BlazeLayout.render('mainLayout', { main: '',topbar :'topbar',right:'chatLayout' });
    }
});
FlowRouter.route("/publicaciones", {
    name: 'publicaciones',
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',right:'chatLayout'});
    }
});
 


