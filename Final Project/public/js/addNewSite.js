(function ($) {
    let hasErrors = false;
    function validString(str) {
        if (!str) {
            hasErrors = true;
            return false
        }
        return true;
    }

    let addNewSiteForm = $('#addNewSiteForm');
    let sitename = $('#sitename');
    let addressLine = $('#addressLine');
    let apartment_suite_unitNumber = $('#apartment_suite_unitNumber');
    let city = $('#city');
    let county = $('#county');
    let state = $('#state');
    let postalCode = $('#postalCode');

    let addSite = $('#addSite');

    addNewSiteForm.submit((event) => {
        event.preventDefault();
        hasErrors = false;
        addSite.prop('disabled', true);

        sitename.removeClass('is-invalid is-valid');
        addressLine.removeClass('is-invalid is-valid');
        apartment_suite_unitNumber.removeClass('is-invalid is-valid');
        city.removeClass('is-invalid is-valid');
        county.removeClass('is-invalid is-valid');
        state.removeClass('is-invalid is-valid');
        postalCode.removeClass('is-invalid is-valid');

        let info = {
            sitename: sitename.val().trim(),
            addressLine: addressLine.val().trim(),
            apartment_suite_unitNumber: apartment_suite_unitNumber.val().trim(),
            city: city.val().trim(),
            county: county.val().trim(),
            state: state.val().trim(),
            postalCode: postalCode.val().trim()
        };

        if (!validString(info.sitename)) sitename.addClass('is-invalid');
        if (!validString(info.addressLine)) addressLine.addClass('is-invalid');
        if (!validString(info.apartment_suite_unitNumber)) apartment_suite_unitNumber.addClass('is-invalid');
        if (!validString(info.city)) city.addClass('is-invalid');
        if (!validString(info.county)) county.addClass('is-invalid');
        if (!validString(info.state)) state.addClass('is-invalid');
        if (!validString(info.postalCode)) postalCode.addClass('is-invalid');
        if (!(/^[0-9]{5}?$/).test(info.postalCode)) {
            postalCode.addClass('is-invalid is-valid');
            hasErrors = true;
        }

        if (!hasErrors) {
            addNewSiteForm.unbind().submit();
        } else {
            addSite.prop('disabled', false);
        }
    });

})(jQuery);