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
        BlazeLayout.render('mainLayout', { main: 'homeLayout',topbar :'topbar',left: "",right:"chatLayout" });
    }
});
FlowRouter.route("/perfil", {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', { main: 'perfil',topbar :'topbar',left: "",right:"" });
    }
});
