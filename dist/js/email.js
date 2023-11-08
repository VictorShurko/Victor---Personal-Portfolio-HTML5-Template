// Contact Form Validation
"use strict";

function sendRequest(){

        let form = $("#contactform"),
            notificationForm = $('#notification'),
            name = encodeURIComponent(document.getElementById("name").value),
            successMessage  = '<div class="notification-success"><h6>Thank you <strong>' + decodeURIComponent(name) + '</strong>!</h6><br><p>Your message has been sent successfully and we\'ll be in touch with you soon.</p></div>', // success message
            warningMessage  = '<div class="notification-warning">Please complete the form first.</div>', // warning message
            errorMessage    = '<div class="notification-error">Oops, something went wrong. Please try again later.</div>';  // error message
        
            $.ajax({
                url: "php/contact.php",
                type: "POST",
                data: form.serialize(),
                success: function(response) {
                    let data = JSON.parse(response),
                        message;

                    if(data.status == 'success') {
                        message = successMessage;
                    }

                    if(data.status == 'warning') {
                        message = warningMessage;
                    }

                    if(data.status == 'error') {
                        message = errorMessage;
                    }

                    callAlert(message, data.status);
                },
                error: function(response) {
                    callAlert(errorMessage, "error");
                }
            });

        // Show alert

        function callAlert(message, type) {
            notificationForm.stop().remove();

            var alertClass;

            if(type == "success") {
                alertClass = "light-green";
            }
            if(type == "error") {
                alertClass = "red";
            }
            if(type == "warning") {
                alertClass = "orange";
            }

            let alert = '<div class="notification--'+ alertClass + '">' + message + '</div>';
            $("#contactform").slideUp('fast');
            $('#contactWrapper').append(notificationForm.html(alert).slideUp('fast').slideDown('fast'));
        };
};

function validate_email(address) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(address) == false) {
        return false;
    } else {
        return true;
    }    
};
 
function check_values() {
    //Form
    var valid = '';
    var name = '';
    var email = '';
    var subject = '';
    var body = '';
    
    if(typeof $('#contactform #name').val() != "undefined" )
    {
    name = document.getElementById("name").value;
    }
    if(typeof $('#contactform #email').val() != "undefined" )
    {
    email = document.getElementById("email").value;
    }
    if(typeof $('#contactform #subject').val() != "undefined" )
    {
    subject = document.getElementById("subject").value;
    }
    if(typeof $('#contactform #body').val() != "undefined" )
    {
    body = document.getElementById("body").value;
    }

    
    var errors=0;
    if($('#contactform #name').val()!=undefined)
    if($('#contactform #name').val()=='') {
        var hasClass=$('#contactform #name').parent().find(".error").hasClass("error");
        if(!hasClass)
            $('#contactform #name').parent().append('<label for="name" generated="true" class="error">Please enter your name</label>');
            $('#contactform #name').focus();
            //return false;
            errors++;
        }
        else
        $('#contactform #name').parent().find(".error").remove();
        
        if($('#contactform #email').val()!=undefined)
        if(validate_email($('#contactform #email').val())==false ) {
        var hasClass=$('#contactform #email').parent().find(".error").hasClass("error");
        if(!hasClass)
            $('#contactform #email').parent().append('<label for="email" generated="true" class="error">Please enter a valid email address</label>');	
            $('#contactform #email').focus();
            //return false;
            errors++;
        }
        else
        $('#contactform #email').parent().find(".error").remove();
        
        
        if($('#contactform #subject').val()!=undefined)
        if($('#contactform #subject').val()==''){
        var hasClass=$('#contactform #subject').parent().find(".error").hasClass("error");
        if(!hasClass)
            $('#contactform #subject').parent().append('<label for="subject" generated="true" class="error">You need to enter a subject!</label>');	
            $('#contactform #subject').focus();
            //return false;
            errors++;
        }
        else
        $('#contactform #subject').parent().find(".error").remove();
        
        if($('#contactform #body').val()!=undefined)
        if($('#contactform #body').val()==''){
        var hasClass=$('#contactform #body').parent().find(".error").hasClass("error");
        if(!hasClass)
            $('#contactform #body').parent().append('<label for="body" generated="true" class="error">You need to enter a message!</label>');	
            $('#contactform #body').focus();
            //return false;
            errors++;
        }
        else
        $('#contactform #body').parent().find(".error").remove();
        
    

    if(errors==0) {
            document.getElementById("submit").disabled=true;
            document.getElementById("submit").value='Please Wait..';
            sendRequest();
    }
};