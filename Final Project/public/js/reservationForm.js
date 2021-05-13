(function($) {
    let form = $('#reservation-form');
    let date = $('#reservationDate');
    let btn = $('#submitButton');

    form.submit((event) => {
        event.preventDefault();
        date.removeClass('is-valid is-invalid');
        form.unbind().submit();
    })
})