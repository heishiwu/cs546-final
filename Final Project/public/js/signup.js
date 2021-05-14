(function ($) {
    let hasErrors = false;
    function validString(str) {
        if (!str) {
            hasErrors = true;
            return false
        }
        return true;
    }

    let signupForm =$('#signupForm');
    let firstNameInput = $('#firstName');
    let lastNameInput = $('#lastName');
    let usernameInput = $('#username');
    let passwordInput = $('#password');
    let repeatPasswordInput = $('#repeatPassword');
    let emailInput = $('#email');
    let birthdayInput = $('#birthday');
    let insuranceNameInput = $('#insuranceName');
    let insuranceTypeInput = $('#insuranceType');
    
    let signupSubmit = $('#signupSubmit');

    signupForm.submit((event) => {
        event.preventDefault();
        hasErrors = false;

        firstNameInput.removeClass('is-invalid is-valid');
        lastNameInput.removeClass('is-invalid is-valid');
        usernameInput.removeClass('is-invalid is-valid');
        passwordInput.removeClass('is-invalid is-valid');
        repeatPasswordInput.removeClass('is-invalid is-valid');
        emailInput.removeClass('is-invalid is-valid');
        birthdayInput.removeClass('is-invalid is-valid');
        insuranceNameInput.removeClass('is-invalid is-valid');
        insuranceTypeInput.removeClass('is-invalid is-valid');

        let info = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim(),
            repeatPassword: repeatPasswordInput.val().trim(),
            email: emailInput.val().trim(),
            birthday: birthdayInput.val().trim(),
            insuranceName: insuranceNameInput.val().trim(),
            insuranceType: insuranceTypeInput.val()
        };
        
        if (!validString(info.firstName)) firstNameInput.addClass('is-invalid');
        if (!validString(info.lastName)) lastNameInput.addClass('is-invalid');
        if (!validString(info.username)) usernameInput.addClass('is-invalid');
        if (!validString(info.password)) passwordInput.addClass('is-invalid');
        if (!validString(info.repeatPassword)) repeatPasswordInput.addClass('is-invalid');
        if (!validString(info.email)) emailInput.addClass('is-invalid');
        if (!validString(info.birthday)) birthdayInput.addClass('is-invalid');
        if (!validString(info.insuranceName)) insuranceNameInput.addClass('is-invalid');
        if (!validString(info.insuranceType)) insuranceTypeInput.addClass('is-invalid');

        if (!hasErrors) {
            signupForm.unbind().submit();
        }
    });
})(jQuery);