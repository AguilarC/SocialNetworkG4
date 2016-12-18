import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './content/chat.js';
import './content/chat.html';
idGrupos=new ReactiveVar('');
Template.mainLayout.onRendered(function(){

    /*var ancho = $("body").width()
    var objw = $(".floatwindow").width();
    console.log(objw);

    $(".floatwindow").css("margin-left",ancho/2);*/

    
});
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'Nombres',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'userlastnamep',
        fieldLabel: 'Apellido Paterno',
        inputType: 'text',
        visible: true,
    },
    {
        fieldName: 'userlastnamem',
        fieldLabel: 'Apellido Materno',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'gender',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Gender',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
    		id: 1,                  // id suffix of the radio element
            label: 'Masculino',          // label for the radio element
            value: 'Masculino'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Femenino',
            value: 'Femenino',
            checked: 'checked'
        }],
        visible: true
    }]
});
accountsUIBootstrap3.setLanguage('es');
/*
Accounts.onCreatedUser(function(op,us){
    console.log('hola mundo');
});*/