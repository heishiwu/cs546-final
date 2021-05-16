(function ($) {
    let hasErrors = false;
    function validString(str) {
        if (!str) {
            hasErrors = true;
            return false
        }
        return true;
    }

    let signupForm = $('#signupForm');
    let firstNameInput = $('#firstName');
    let lastNameInput = $('#lastName');
    let usernameInput = $('#username');
    let passwordInput = $('#password');
    let repeatPasswordInput = $('#repeatPassword');
    let emailInput = $('#email');
    let birthdayInput = $('#birthday');
    let insuranceNameInput = $('#insuranceName');
    let insuranceTypeInput = $('#insuranceType');
    let postalCodeInput = $('#postalCode');
    let addressLineInput = $('#addressLine')
    let apartment_suite_unitNumberInput = $('#apartment_suite_unitNumber')
    let cityInput = $('#city')
    let countyInput = $('#county')
    let stateInput = $('#state')
    let genderInput = $('#gender')
    let raceInput = $('#race')
    let ethnicityInput = $('#ethnicity')
    let medicalGroupNumberInput = $('#medicalGroupNumber')
    let medicalidInput = $('#medicalid')

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
        postalCodeInput.removeClass('is-invalid is-valid');
        addressLineInput.removeClass('is-invalid is-valid');
        apartment_suite_unitNumberInput.removeClass('is-invalid is-valid');
        cityInput.removeClass('is-invalid is-valid');
        countyInput.removeClass('is-invalid is-valid');
        stateInput.removeClass('is-invalid is-valid');
        // genderInput.removeClass('is-invalid is-valid');
        raceInput.removeClass('is-invalid is-valid');
        ethnicityInput.removeClass('is-invalid is-valid');
        medicalGroupNumberInput.removeClass('is-invalid is-valid');
        medicalidInput.removeClass('is-invalid is-valid');


        let info = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim(),
            repeatPassword: repeatPasswordInput.val().trim(),
            email: emailInput.val().trim(),
            birthday: birthdayInput.val().trim(),
            insuranceName: insuranceNameInput.val(),
            insuranceType: insuranceTypeInput.val(),
            postalCode: postalCodeInput.val().trim(),
            addressLine: addressLineInput.val(),
            apartment_suite_unitNumber: apartment_suite_unitNumberInput.val(),
            city: cityInput.val().trim(),
            county: countyInput.val().trim(),
            state: stateInput.val().trim(),
            // gender: genderInput.val().trim(),
            race: raceInput.val(),
            ethnicity: emailInput.val(),
            medicalGroupNumber: medicalGroupNumberInput.val(),
            medicalid: medicalidInput.val(),
        };

        if (!validString(info.firstName)) firstNameInput.addClass('is-invalid');
        if (!validString(info.lastName)) lastNameInput.addClass('is-invalid');
        if (!validString(info.username)) usernameInput.addClass('is-invalid');
        if (!validString(info.password)) passwordInput.addClass('is-invalid');
        if (!validString(info.repeatPassword)) repeatPasswordInput.addClass('is-invalid');
        // if (!validString(info.email)) 
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(info.email)) {
            emailInput.addClass('is-invalid');
            hasErrors = true;
        }
        if (!validString(info.birthday)) birthdayInput.addClass('is-invalid');
        if (!validString(info.insuranceName)) insuranceNameInput.addClass('is-invalid');
        if (!validString(info.insuranceType)) insuranceTypeInput.addClass('is-invalid');
        if (!(/^[0-9]{5}?$/).test(info.postalCode)) {
            postalCodeInput.addClass('is-invalid is-valid');
            hasErrors = true;
        }
        // if (info.addressLine) {
            if (!validString(info.addressLine)) addressLineInput.addClass('is-invalid');
        // }
        // if (info.apartment_suite_unitNumber) {
            if (!validString(info.apartment_suite_unitNumber)) apartment_suite_unitNumberInput.addClass('is-invalid');
        // }
        // if (info.city) {
            if (!validString(info.city)) cityInput.addClass('is-invalid');
        // }
        // if (info.county) {
            if (!validString(info.county)) countyInput.addClass('is-invalid');
        // }
        // if (info.state) {
            if (!validString(info.state)) stateInput.addClass('is-invalid');
        // }
        // if (info.gender) {
        //     if (!validString(info.gender)) genderInput.addClass('is-invalid');
        // }
        if (info.race) {
            if (!validString(info.race)) raceInput.addClass('is-invalid');
        }
        if (info.ethnicity) {
            if (!validString(info.ethnicity)) ethnicityInput.addClass('is-invalid');
        }
        if (info.medicalGroupNumber) {
            if (!validString(info.medicalGroupNumber)) medicalGroupNumberInput.addClass('is-invalid');
        }
        if (info.medicalid) {
            if (!validString(info.medicalid)) medicalidInput.addClass('is-invalid');
        }


        if (!hasErrors) {
            signupForm.unbind().submit();
        }
    });
})(jQuery);