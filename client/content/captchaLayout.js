/*
Template.captchaLayout.rendered = function() {

     $.getScript('http://www.google.com/recaptcha/api/js/recaptcha_ajax.js', function() {
         Recaptcha.create('6LdihAoUAAAAAMbzuNpVCf3j-RITG3GN2c3Zt8kp', 'rendered-captcha-container', {
             theme: 'red',
             callback: Recaptcha.focus_response_field
         });
     });

}
Template._loginButtonsLoggedInDropdown.events({
	'click button': function(event) {
		event.preventDefault();
        console.log("itworks");
	},
});
Template.captchaLayout.events({
    'submit form#mySecuredForm': function(event) {
        event.preventDefault();
        event.stopPropagation();

        var formData = {
            captcha_challenge_id: Recaptcha.get_challenge(),
            captcha_solution: Recaptcha.get_response()
            //add the data from form inputs here
        };
        Meteor.call('submitMySecuredForm', formData, function(error, result) {
            if (result.success) {
                //set session vars, redirect, etc

            } else {
                Recaptcha.reload();

                // alert error message according to received code
                switch (result.error) {
                    case 'captcha_verification_failed':
                        alert('captcha solution is wrong!');
                        break;
                    case 'other_error_on_form_submit':
                        alert('other error');
                        break;
                    default:
                        alert('error');
                }
            }
        });
    },
});
*/