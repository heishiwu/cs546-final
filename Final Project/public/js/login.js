(function ($) {
    let loginForm = $('#login-form')
    let usernameInput = $('#username');
    let passwordInput = $('#password');
    let loginSubmit = $('#loginSubmit');
    let errors = $('.error');

    loginForm.submit((event) => {
        event.preventDefault();
        usernameInput.removeClass('is-invalid is-valid');
        passwordInput.removeClass('is-invalid is-valid');
        loginSubmit.prop('disabled', true);
        errors.hide();

        let info = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        let hasErrors = false;
        if (!info.username || !info.password) {
            usernameInput.addClass('is-invalid');
            passwordInput.addClass('is-invalid');
            hasErrors = true;
        }

        if (!hasErrors) {
            loginForm.unbind().submit();
        } else {
            loginSubmit.prop('disabled', false);
        }
    });
})(jQuery);