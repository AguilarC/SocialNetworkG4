
FlowRouter.route("/"),{
    name: "home",
    action() {
        BlazeLayout.router("mainLayout");
    }
} 