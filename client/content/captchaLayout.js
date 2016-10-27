Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: '6LfNRwoUAAAAAE8HG5nsI7jfnJaS3vCVLauuvmGx',
        hl: 'es' // optional display language
    });
});
Template.captchaLayout.events({
    'submit form': function(e) {
        e.preventDefault();

        var formData = {
            //get the data from your form fields
            nom :e.target.enter.value,
        };

        //get the captcha data
        var captchaData = grecaptcha.getResponse();

        Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            // reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {
                console.log('Success!');
            }
        });
    }
});