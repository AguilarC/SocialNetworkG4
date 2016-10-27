import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout} from "meteor/kadira:blaze-layout";
import {accounts} from "meteor/useraccounts:bootstrap";

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
FlowRouter.route("/captcha", {
    name: 'captcha',
    action() {
        BlazeLayout.render('mainLayout', { main: 'captchaLayout',topbar :'topbar',right:'chatLayout'});
    }
});

