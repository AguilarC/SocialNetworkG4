import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout} from "meteor/kadira:blaze-layout";

/*FlowRouter.route("/", {
	name: "home",
	action(){
		BlazeLayout.render("homeLayout");
	}	
});*/
FlowRouter.route("/", {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', { main: 'homeLayout',topbar :'topbar'});
    }
});
FlowRouter.route("/perfil", {
    name: 'perfil',
    action() {
        BlazeLayout.render('mainLayout', { main: 'perfil',topbar :'topbar',left: "",right:"" });
    }
});

FlowRouter.route("/chat", {
    name: 'chatLayout',
    action() {
        BlazeLayout.render('mainLayout', { main: 'chatLayout',topbar :'topbar'});
    }
});
FlowRouter.route("/publicaciones", {
    name: 'publicaciones',
    action() {
        BlazeLayout.render('mainLayout', { main: 'publicaciones',topbar :'topbar',left: "",right:"" });
    }
});
 

