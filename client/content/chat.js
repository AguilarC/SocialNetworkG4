import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './chat.html';

Template.chatLayout.events({
    'click a': function(e){
        e.preventDefault();
        var id=event.target.id;
        $('#'+id+id).toggle("slow");
        console.log(""+id);

    },
});